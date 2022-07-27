package handlers

import (
	"github.com/GiovanniCavallari/docker-interface/api/helpers/response"
	"github.com/GiovanniCavallari/docker-interface/api/services"
	"github.com/GiovanniCavallari/docker-interface/api/types"
	"github.com/gin-gonic/gin"
)

type ComposeHandler interface {
	List(ctx *gin.Context)
	Up(ctx *gin.Context)
	Down(ctx *gin.Context)
	Start(ctx *gin.Context)
	Stop(ctx *gin.Context)
}

type composeHandler struct {
	service services.ComposeService
}

func NewComposeHandler(service services.ComposeService) ComposeHandler {
	return &composeHandler{
		service,
	}
}

func (h composeHandler) List(ctx *gin.Context) {
	var uri types.ComposeStackUri

	if err := ctx.ShouldBindUri(&uri); err != nil {
		response := response.BadRequestResponse(err)
		ctx.JSON(response.StatusCode, response)
		return
	}

	response := h.service.List(ctx, uri.Stack)
	ctx.JSON(response.StatusCode, response)
}

func (h composeHandler) Up(ctx *gin.Context) {
	var uri types.ComposeStackUri

	if err := ctx.ShouldBindUri(&uri); err != nil {
		response := response.BadRequestResponse(err)
		ctx.JSON(response.StatusCode, response)
		return
	}

	response := h.service.Up(ctx, uri.Stack)
	ctx.JSON(response.StatusCode, response)
}

func (h composeHandler) Down(ctx *gin.Context) {
	var uri types.ComposeStackUri

	if err := ctx.ShouldBindUri(&uri); err != nil {
		response := response.BadRequestResponse(err)
		ctx.JSON(response.StatusCode, response)
		return
	}

	response := h.service.Down(ctx, uri.Stack)
	ctx.JSON(response.StatusCode, response)
}

func (h composeHandler) Start(ctx *gin.Context) {
	var uri types.ComposeStackUri

	if err := ctx.ShouldBindUri(&uri); err != nil {
		response := response.BadRequestResponse(err)
		ctx.JSON(response.StatusCode, response)
		return
	}

	response := h.service.Start(ctx, uri.Stack)
	ctx.JSON(response.StatusCode, response)
}

func (h composeHandler) Stop(ctx *gin.Context) {
	var uri types.ComposeStackUri

	if err := ctx.ShouldBindUri(&uri); err != nil {
		response := response.BadRequestResponse(err)
		ctx.JSON(response.StatusCode, response)
		return
	}

	response := h.service.Stop(ctx, uri.Stack)
	ctx.JSON(response.StatusCode, response)
}
