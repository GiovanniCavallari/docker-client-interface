package handlers

import (
	"github.com/GiovanniCavallari/docker-interface/api/helpers/response"
	"github.com/GiovanniCavallari/docker-interface/api/services"
	"github.com/GiovanniCavallari/docker-interface/api/types"
	"github.com/gin-gonic/gin"
)

type ContainersHandler interface {
	GetAllContainers(ctx *gin.Context)
	GetContainer(ctx *gin.Context)
	GetContainerLogs(ctx *gin.Context)
	CreateAvailableContainer(ctx *gin.Context)
	StartContainer(ctx *gin.Context)
	StopContainer(ctx *gin.Context)
	RemoveContainer(ctx *gin.Context)
}

type containersHandler struct {
	service services.ContainersService
}

func NewContainersHandler(service services.ContainersService) ContainersHandler {
	return &containersHandler{
		service,
	}
}

func (h containersHandler) GetAllContainers(ctx *gin.Context) {
	response := h.service.GetAllContainers(ctx)
	ctx.JSON(response.StatusCode, response)
}

func (h containersHandler) GetContainer(ctx *gin.Context) {
	var uri types.ContainerIdUri

	if err := ctx.ShouldBindUri(&uri); err != nil {
		response := response.BadRequestResponse(err)
		ctx.JSON(response.StatusCode, response)
		return
	}

	response := h.service.GetContainer(ctx, uri.ContainerID)
	ctx.JSON(response.StatusCode, response)
}

func (h containersHandler) GetContainerLogs(ctx *gin.Context) {
	var uri types.ContainerIdUri

	if err := ctx.ShouldBindUri(&uri); err != nil {
		response := response.BadRequestResponse(err)
		ctx.JSON(response.StatusCode, response)
		return
	}

	response := h.service.GetContainerLogs(uri.ContainerID)
	ctx.JSON(response.StatusCode, response)
}

func (h containersHandler) CreateAvailableContainer(ctx *gin.Context) {
	var uri types.ContainerNameUri

	if err := ctx.ShouldBindUri(&uri); err != nil {
		response := response.BadRequestResponse(err)
		ctx.JSON(response.StatusCode, response)
		return
	}

	response := h.service.CreateAvailableContainer(ctx, uri.ContainerName)
	ctx.JSON(response.StatusCode, response)
}

func (h containersHandler) StartContainer(ctx *gin.Context) {
	var uri types.ContainerIdUri

	if err := ctx.ShouldBindUri(&uri); err != nil {
		response := response.BadRequestResponse(err)
		ctx.JSON(response.StatusCode, response)
		return
	}

	response := h.service.StartContainer(ctx, uri.ContainerID)
	ctx.JSON(response.StatusCode, response)
}

func (h containersHandler) StopContainer(ctx *gin.Context) {
	var uri types.ContainerIdUri

	if err := ctx.ShouldBindUri(&uri); err != nil {
		response := response.BadRequestResponse(err)
		ctx.JSON(response.StatusCode, response)
		return
	}

	response := h.service.StopContainer(ctx, uri.ContainerID)
	ctx.JSON(response.StatusCode, response)
}

func (h containersHandler) RemoveContainer(ctx *gin.Context) {
	var uri types.ContainerIdUri

	if err := ctx.ShouldBindUri(&uri); err != nil {
		response := response.BadRequestResponse(err)
		ctx.JSON(response.StatusCode, response)
		return
	}

	response := h.service.RemoveContainer(ctx, uri.ContainerID)
	ctx.JSON(response.StatusCode, response)
}
