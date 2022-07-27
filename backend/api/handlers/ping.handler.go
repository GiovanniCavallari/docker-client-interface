package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type PingHandler interface {
	Handler(ctx *gin.Context)
}

type pingHandler struct{}

func NewPingHandler() PingHandler {
	return &pingHandler{}
}

func (h pingHandler) Handler(ctx *gin.Context) {
	ctx.String(http.StatusOK, "pong")
}
