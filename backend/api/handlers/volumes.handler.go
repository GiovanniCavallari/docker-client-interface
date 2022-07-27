package handlers

import (
	"github.com/GiovanniCavallari/docker-interface/api/helpers/response"
	"github.com/GiovanniCavallari/docker-interface/api/services"
	"github.com/GiovanniCavallari/docker-interface/api/types"
	"github.com/gin-gonic/gin"
)

type VolumesHandler interface {
	GetAllVolumes(ctx *gin.Context)
	GetVolume(ctx *gin.Context)
	RemoveVolume(ctx *gin.Context)
	PruneVolumes(ctx *gin.Context)
}

type volumesHandler struct {
	service services.VolumesService
}

func NewVolumesHandler(service services.VolumesService) VolumesHandler {
	return &volumesHandler{
		service,
	}
}

func (h volumesHandler) GetAllVolumes(ctx *gin.Context) {
	response := h.service.GetAllVolumes(ctx)
	ctx.JSON(response.StatusCode, response)
}

func (h volumesHandler) GetVolume(ctx *gin.Context) {
	var uri types.VolumeNameUri

	if err := ctx.ShouldBindUri(&uri); err != nil {
		response := response.BadRequestResponse(err)
		ctx.JSON(response.StatusCode, response)
		return
	}

	response := h.service.GetVolume(ctx, uri.VolumeName)
	ctx.JSON(response.StatusCode, response)
}

func (h volumesHandler) RemoveVolume(ctx *gin.Context) {
	var uri types.VolumeNameUri

	if err := ctx.ShouldBindUri(&uri); err != nil {
		response := response.BadRequestResponse(err)
		ctx.JSON(response.StatusCode, response)
		return
	}

	response := h.service.RemoveVolume(ctx, uri.VolumeName)
	ctx.JSON(response.StatusCode, response)
}

func (h volumesHandler) PruneVolumes(ctx *gin.Context) {
	response := h.service.PruneVolumes(ctx)
	ctx.JSON(response.StatusCode, response)
}
