package services

import (
	"context"
	"io"
	"sort"
	"time"

	"github.com/GiovanniCavallari/docker-interface/api/clients"
	"github.com/GiovanniCavallari/docker-interface/api/entities"
	"github.com/GiovanniCavallari/docker-interface/api/helpers/response"
	"github.com/GiovanniCavallari/docker-interface/api/mappers"
	"github.com/GiovanniCavallari/docker-interface/api/types"
	"github.com/GiovanniCavallari/docker-interface/containers"
	"github.com/gin-gonic/gin"
)

type ContainersService interface {
	GetAllContainers(ctx *gin.Context) types.Response
	GetContainer(ctx *gin.Context, containerID string) types.Response
	GetContainerLogs(containerID string) types.Response
	CreateContainer(ctx *gin.Context, dto types.ContainerDto) types.Response
	CreateAvailableContainer(ctx *gin.Context, containerName string) types.Response
	StartContainer(ctx *gin.Context, containerID string) types.Response
	StopContainer(ctx *gin.Context, containerID string) types.Response
	RemoveContainer(ctx *gin.Context, containerID string) types.Response
}

type containersService struct {
	dockerClient clients.DockerClient
	mapper       mappers.ContainerMapper
}

func NewContainersService(dockerClient clients.DockerClient) ContainersService {
	return &containersService{
		dockerClient: dockerClient,
		mapper:       mappers.NewContainerMapper(),
	}
}

func (s containersService) GetAllContainers(ctx *gin.Context) types.Response {
	containers, err := s.dockerClient.ContainersList(ctx)
	if err != nil {
		return response.InternalServerErrorResponse(err)
	}

	mapper := s.mapper.MapDockerContainersToResponse(containers)
	sort.Slice(mapper, func(a, b int) bool {
		return mapper[a].Created < mapper[b].Created
	})

	return response.OkResponse(mapper)
}

func (s containersService) GetContainer(ctx *gin.Context, containerID string) types.Response {
	container, err := s.dockerClient.ContainerInspect(ctx, containerID)
	if err != nil {
		return response.InternalServerErrorResponse(err)
	}

	mapper := s.mapper.MapContainerJsonToResponse(container)
	return response.OkResponse(mapper)
}

func (s containersService) GetContainerLogs(containerID string) types.Response {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	reader, err := s.dockerClient.ContainerLogs(ctx, containerID)
	if err != nil {
		return response.InternalServerErrorResponse(err)
	}

	bytes, _ := io.ReadAll(reader)
	return response.OkResponse(string(bytes))
}

func (s containersService) CreateContainer(ctx *gin.Context, dto types.ContainerDto) types.Response {
	containerConfig := entities.NewContainer(dto)

	err := s.dockerClient.ImagePull(ctx, containerConfig.Container.Image)
	if err != nil {
		return response.InternalServerErrorResponse(err)
	}

	container, err := s.dockerClient.ContainerCreate(ctx, containerConfig, containerConfig.Name)
	if err != nil {
		return response.InternalServerErrorResponse(err)
	}

	err = s.dockerClient.ContainerStart(ctx, container.ID)
	if err != nil {
		return response.InternalServerErrorResponse(err)
	}

	mapper := s.mapper.MapContainerCreatedBodyToResponse(container)
	return response.CreatedResponse(mapper)
}

func (s containersService) StartContainer(ctx *gin.Context, containerID string) types.Response {
	err := s.dockerClient.ContainerStart(ctx, containerID)
	if err != nil {
		return response.InternalServerErrorResponse(err)
	}

	return response.OkResponse(nil)
}

func (s containersService) StopContainer(ctx *gin.Context, containerID string) types.Response {
	err := s.dockerClient.ContainerStop(ctx, containerID)
	if err != nil {
		return response.InternalServerErrorResponse(err)
	}

	return response.OkResponse(nil)
}

func (s containersService) RemoveContainer(ctx *gin.Context, containerID string) types.Response {
	err := s.dockerClient.ContainerRemove(ctx, containerID)
	if err != nil {
		return response.InternalServerErrorResponse(err)
	}

	return response.OkResponse(nil)
}

func (s containersService) CreateAvailableContainer(ctx *gin.Context, containerName string) types.Response {
	containerConfig := s.validateAvailableContainers(containerName)
	if containerConfig.Container.Image == "" {
		return response.NotFoundResponse("Container not found")
	}

	err := s.dockerClient.ImagePull(ctx, containerConfig.Container.Image)
	if err != nil {
		return response.InternalServerErrorResponse(err)
	}

	container, err := s.dockerClient.ContainerCreate(ctx, containerConfig, containerConfig.Name)
	if err != nil {
		return response.InternalServerErrorResponse(err)
	}

	err = s.dockerClient.ContainerStart(ctx, container.ID)
	if err != nil {
		return response.InternalServerErrorResponse(err)
	}

	mapper := s.mapper.MapContainerCreatedBodyToResponse(container)
	return response.CreatedResponse(mapper)
}

func (s containersService) validateAvailableContainers(containerName string) types.ContainerConfig {
	var containerConfig types.ContainerConfig

	switch containerName {
	case "proxy":
		containerConfig = containers.GetProxyContainerConfig()
	case "mysql":
		containerConfig = containers.GetMysqlContainerConfig()
	case "adminer":
		containerConfig = containers.GetAdminerContainerConfig()
	case "wordpress":
		containerConfig = containers.GetWordpressContainerConfig()
	}

	return containerConfig
}
