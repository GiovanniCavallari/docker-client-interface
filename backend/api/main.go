package main

import "github.com/GiovanniCavallari/docker-interface/api/app"

func main() {
	app.NewApp().StartServer()
}
