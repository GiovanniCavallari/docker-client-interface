package containers

import (
	"github.com/GiovanniCavallari/docker-interface/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/mount"
	"github.com/docker/go-connections/nat"
)

func GetProxyContainerConfig() types.ContainerConfig {
	return types.ContainerConfig{
		Name: "proxy",
		Container: container.Config{
			Image: "giocavallari/nginx-proxy",
			Tty:   true,
			Env: []string{
				"TUNNEL_PATH=/",
				"TUNNEL_PORT=80",
			},
			ExposedPorts: nat.PortSet{
				"80/tcp": {},
			},
		},
		Host: container.HostConfig{
			PortBindings: nat.PortMap{
				"80/tcp": []nat.PortBinding{
					{
						HostIP:   "0.0.0.0",
						HostPort: "8888",
					},
				},
			},
			Mounts: []mount.Mount{
				{
					Type:   mount.TypeVolume,
					Source: "npcerts",
					Target: "/etc/letsencrypt",
				},
			},
		},
	}
}
