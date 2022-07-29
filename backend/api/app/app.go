package app

import (
	"github.com/GiovanniCavallari/docker-interface/api/clients"
	"github.com/GiovanniCavallari/docker-interface/api/handlers"
	"github.com/GiovanniCavallari/docker-interface/api/services"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type App struct {
	Router            *gin.Engine
	PingHandler       handlers.PingHandler
	ContainersHandler handlers.ContainersHandler
	ComposeHandler    handlers.ComposeHandler
	VolumesHandler    handlers.VolumesHandler
}

func NewApp() *App {
	app := new(App)
	app.Router = gin.Default()

	// clients
	dockerClient := clients.NewDockerClient()

	// services
	containersService := services.NewContainersService(dockerClient)
	composeService := services.NewComposeService(dockerClient, containersService)
	volumesService := services.NewVolumesService(dockerClient)

	// handlers
	app.PingHandler = handlers.NewPingHandler()
	app.ContainersHandler = handlers.NewContainersHandler(containersService)
	app.ComposeHandler = handlers.NewComposeHandler(composeService)
	app.VolumesHandler = handlers.NewVolumesHandler(volumesService)

	app.configureCORS()
	app.configureRoutes()

	return app
}

func (app App) StartServer() {
	app.Router.Run(":8080")
}

func (app App) configureRoutes() {
	app.Router.GET("/ping", app.PingHandler.Handler)

	app.Router.GET("/containers", app.ContainersHandler.GetAllContainers)

	app.Router.GET("/containers/:container", app.ContainersHandler.GetContainer)
	app.Router.GET("/containers/:container/logs", app.ContainersHandler.GetContainerLogs)
	app.Router.POST("/containers/:container", app.ContainersHandler.CreateContainer)
	app.Router.POST("/containers/:container/start", app.ContainersHandler.StartContainer)
	app.Router.POST("/containers/:container/stop", app.ContainersHandler.StopContainer)
	app.Router.POST("/containers/:container/down", app.ContainersHandler.RemoveContainer)

	app.Router.GET("/compose/:stack", app.ComposeHandler.List)
	app.Router.POST("/compose/:stack", app.ComposeHandler.Up)
	app.Router.POST("/compose/:stack/start", app.ComposeHandler.Start)
	app.Router.POST("/compose/:stack/stop", app.ComposeHandler.Stop)
	app.Router.POST("/compose/:stack/down", app.ComposeHandler.Down)

	app.Router.GET("/volumes", app.VolumesHandler.GetAllVolumes)
	app.Router.GET("/volumes/:volume", app.VolumesHandler.GetVolume)
	app.Router.POST("/volumes/:volume/remove", app.VolumesHandler.RemoveVolume)
	app.Router.POST("/volumes/prune", app.VolumesHandler.PruneVolumes)
}

func (app App) configureCORS() {
	app.Router.Use(cors.Default())
}
