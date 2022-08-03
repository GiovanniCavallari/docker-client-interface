package services

import (
	"fmt"

	"github.com/GiovanniCavallari/docker-interface/api/clients"
	"github.com/GiovanniCavallari/docker-interface/api/helpers/response"
	"github.com/GiovanniCavallari/docker-interface/api/helpers/slice"
	"github.com/GiovanniCavallari/docker-interface/api/types"
	"github.com/GiovanniCavallari/docker-interface/compose"
	"github.com/gin-gonic/gin"
)

type ComposeService interface {
	List(ctx *gin.Context, stack string) types.Response
	Up(ctx *gin.Context, stack string) types.Response
	Start(ctx *gin.Context, stack string) types.Response
	Stop(ctx *gin.Context, stack string) types.Response
	Down(ctx *gin.Context, stack string) types.Response
}

type composeService struct {
	dockerClient      clients.DockerClient
	containersService ContainersService
}

func NewComposeService(dockerClient clients.DockerClient, containersService ContainersService) ComposeService {
	return &composeService{
		dockerClient,
		containersService,
	}
}

func (s composeService) List(ctx *gin.Context, stack string) types.Response {
	var containers []types.Container

	composeConfig := s.getAvailableStacks(stack)
	if composeConfig.Name == "" {
		return response.NotFoundResponse("Compose stack not found")
	}

	res := s.containersService.GetAllContainers(ctx)
	data := s.convertData(res)

	for _, container := range data {
		for _, name := range composeConfig.Dependencies {
			if slice.Contains(container.Names, fmt.Sprintf("/%s", name)) {
				containers = append(containers, container)
			}
		}
	}

	return response.OkResponse(containers)
}

func (s composeService) Up(ctx *gin.Context, stack string) types.Response {
	var containers []types.ComposeContainer

	composeConfig := s.getAvailableStacks(stack)
	if composeConfig.Name == "" {
		return response.NotFoundResponse("Compose stack not found")
	}

	for _, dependency := range composeConfig.Dependencies {
		containers = append(containers, s.createContainer(ctx, dependency))
	}

	return response.CreatedResponse(containers)
}

func (s composeService) Down(ctx *gin.Context, stack string) types.Response {
	composeConfig := s.getAvailableStacks(stack)
	if composeConfig.Name == "" {
		return response.NotFoundResponse("Compose stack not found")
	}

	res := s.List(ctx, stack)
	data := s.convertData(res)

	for _, container := range data {
		s.containersService.RemoveContainer(ctx, container.ID)
	}

	return response.OkResponse(nil)
}

func (s composeService) Start(ctx *gin.Context, stack string) types.Response {
	composeConfig := s.getAvailableStacks(stack)
	if composeConfig.Name == "" {
		return response.NotFoundResponse("Compose stack not found")
	}

	res := s.List(ctx, stack)
	data := s.convertData(res)

	for _, container := range data {
		s.containersService.StartContainer(ctx, container.ID)
	}

	return response.OkResponse(nil)
}

func (s composeService) Stop(ctx *gin.Context, stack string) types.Response {
	composeConfig := s.getAvailableStacks(stack)
	if composeConfig.Name == "" {
		return response.NotFoundResponse("Compose stack not found")
	}

	res := s.List(ctx, stack)
	data := s.convertData(res)

	for _, container := range data {
		s.containersService.StopContainer(ctx, container.ID)
	}

	return response.OkResponse(nil)
}

func (s composeService) convertData(res types.Response) []types.Container {
	var data []types.Container

	if res.Data != nil {
		data = res.Data.([]types.Container)
	}

	return data
}

func (s composeService) getAvailableStacks(stack string) types.ComposeConfig {
	var composeConfig types.ComposeConfig

	switch stack {
	case "wordpress":
		composeConfig = compose.GetWordpressComposeConfig()
	}

	return composeConfig
}

func (s composeService) createContainer(ctx *gin.Context, containerName string) types.ComposeContainer {
	var data types.ContainerCreated

	res := s.containersService.CreateAvailableContainer(ctx, containerName)
	if res.Data != nil {
		data = res.Data.(types.ContainerCreated)
	}

	container := types.ComposeContainer{
		ID:      data.ID,
		Name:    containerName,
		Message: res.Message,
		Error:   false,
	}

	if res.StatusCode > 299 {
		container.Error = true
	}

	return container
}
