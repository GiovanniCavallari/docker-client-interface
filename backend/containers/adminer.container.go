package containers

import (
	"github.com/GiovanniCavallari/docker-interface/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/go-connections/nat"
)

func GetAdminerContainerConfig() types.ContainerConfig {
	return types.ContainerConfig{
		Name: "adminer",
		Container: container.Config{
			Image: "adminer",
			Tty:   true,
			ExposedPorts: nat.PortSet{
				"8080/tcp": struct{}{},
			},
		},
		Host: container.HostConfig{
			PortBindings: nat.PortMap{
				"8080/tcp": []nat.PortBinding{
					{
						HostIP:   "0.0.0.0",
						HostPort: "81",
					},
				},
			},
			Links: []string{
				"mysql",
			},
		},
	}
}
