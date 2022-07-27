package containers

import (
	"github.com/GiovanniCavallari/docker-interface/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/mount"
	"github.com/docker/docker/api/types/strslice"
	"github.com/docker/go-connections/nat"
)

func GetMysqlContainerConfig() types.ContainerConfig {
	return types.ContainerConfig{
		Name: "mysql",
		Container: container.Config{
			Image: "mysql:5.7",
			Cmd: strslice.StrSlice{
				"--innodb-use-native-aio=0",
			},
			Tty: true,
			Env: []string{
				"MYSQL_USER=exampleuser",
				"MYSQL_PASSWORD=examplepass",
				"MYSQL_ROOT_PASSWORD=root",
				"MYSQL_DATABASE=exampledb",
			},
			ExposedPorts: nat.PortSet{
				"3306/tcp": struct{}{},
			},
		},
		Host: container.HostConfig{
			PortBindings: nat.PortMap{
				"3306/tcp": []nat.PortBinding{
					{
						HostIP:   "0.0.0.0",
						HostPort: "3306",
					},
				},
			},
			Mounts: []mount.Mount{
				{
					Type:        mount.TypeVolume,
					Source:      "mysql",
					Target:      "/var/lib/mysql",
					Consistency: mount.ConsistencyDelegated,
				},
			},
		},
	}
}
