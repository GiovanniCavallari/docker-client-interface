package containers

import (
	"github.com/GiovanniCavallari/docker-interface/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/mount"
	"github.com/docker/go-connections/nat"
)

func GetWordpressContainerConfig() types.ContainerConfig {
	return types.ContainerConfig{
		Name: "wordpress",
		Container: container.Config{
			Image: "wordpress:php7.4-apache",
			Tty:   true,
			Env: []string{
				"WORDPRESS_DB_HOST=mysql",
				"WORDPRESS_DB_USER=exampleuser",
				"WORDPRESS_DB_PASSWORD=examplepass",
				"WORDPRESS_DB_NAME=exampledb",
			},
			ExposedPorts: nat.PortSet{
				"80/tcp": struct{}{},
			},
		},
		Host: container.HostConfig{
			PortBindings: nat.PortMap{
				"80/tcp": []nat.PortBinding{
					{
						HostIP:   "0.0.0.0",
						HostPort: "80",
					},
				},
			},
			Mounts: []mount.Mount{
				{
					Type:        mount.TypeVolume,
					Source:      "wordpress",
					Target:      "/var/www/html",
					Consistency: mount.ConsistencyDelegated,
				},
			},
			Links: []string{
				"mysql",
			},
		},
	}
}
