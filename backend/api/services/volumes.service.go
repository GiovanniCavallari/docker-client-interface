package services

import (
	"github.com/GiovanniCavallari/docker-interface/api/clients"
	"github.com/GiovanniCavallari/docker-interface/api/helpers/response"
	"github.com/GiovanniCavallari/docker-interface/api/mappers"
	"github.com/GiovanniCavallari/docker-interface/api/types"
	"github.com/gin-gonic/gin"
)

type VolumesService interface {
	GetAllVolumes(ctx *gin.Context) types.Response
	GetVolume(ctx *gin.Context, volumeName string) types.Response
	RemoveVolume(gin *gin.Context, volumeName string) types.Response
	PruneVolumes(ctx *gin.Context) types.Response
}

type volumesService struct {
	dockerClient clients.DockerClient
	mapper       mappers.VolumeMapper
}

func NewVolumesService(dockerClient clients.DockerClient) VolumesService {
	return &volumesService{
		dockerClient: dockerClient,
		mapper:       mappers.NewVolumeMapper(),
	}
}

func (s volumesService) GetAllVolumes(ctx *gin.Context) types.Response {
	volumes, err := s.dockerClient.VolumesList(ctx)
	if err != nil {
		return response.InternalServerErrorResponse(err)
	}

	mapper := s.mapper.MapVolumesListBodyToResponse(volumes)
	return response.OkResponse(mapper)
}

func (s volumesService) GetVolume(ctx *gin.Context, volumeName string) types.Response {
	volume, err := s.dockerClient.VolumeInspect(ctx, volumeName)
	if err != nil {
		return response.InternalServerErrorResponse(err)
	}

	mapper := s.mapper.MapSingleVolumeToResponse(&volume)
	return response.OkResponse(mapper)
}

func (s volumesService) RemoveVolume(ctx *gin.Context, volumeName string) types.Response {
	err := s.dockerClient.VolumeRemove(ctx, volumeName)
	if err != nil {
		return response.InternalServerErrorResponse(err)
	}

	return response.OkResponse(nil)
}

func (s volumesService) PruneVolumes(ctx *gin.Context) types.Response {
	report, err := s.dockerClient.VolumesPrune(ctx)
	if err != nil {
		return response.InternalServerErrorResponse(err)
	}

	mapper := s.mapper.MapVolumesPruneReportToResponse(report)
	return response.OkResponse(mapper)
}
