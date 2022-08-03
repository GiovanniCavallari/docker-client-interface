package entities

import (
	"fmt"

	"github.com/GiovanniCavallari/docker-interface/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/mount"
	"github.com/docker/go-connections/nat"
)

const hostIP = "0.0.0.0"

func NewContainer(dto types.ContainerDto) types.ContainerConfig {
	bindingPorts := nat.PortMap{}
	exposedPorts := nat.PortSet{}

	for _, port := range dto.ExposedPorts {
		portWithProtocol := nat.Port(fmt.Sprintf("%s/tcp", port.ContainerPort))
		exposedPorts[portWithProtocol] = struct{}{}
		bindingPorts[portWithProtocol] = []nat.PortBinding{
			{
				HostIP:   hostIP,
				HostPort: port.HostPort,
			},
		}
	}

	var mounts []mount.Mount
	for _, dtoMount := range dto.Mounts {
		mounts = append(mounts, mount.Mount{
			Type:        mount.TypeVolume,
			Consistency: mount.ConsistencyDelegated,
			Source:      dtoMount.Name,
			Target:      dtoMount.Target,
		})
	}

	return types.ContainerConfig{
		Name: dto.Name,
		Container: container.Config{
			Tty:          true,
			Env:          dto.Env,
			Image:        dto.Image,
			ExposedPorts: exposedPorts,
		},
		Host: container.HostConfig{
			Links:        dto.Links,
			Mounts:       mounts,
			PortBindings: bindingPorts,
		},
	}
}
