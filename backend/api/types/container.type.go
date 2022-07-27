package types

import (
	"github.com/docker/docker/api/types/container"
	mounttypes "github.com/docker/docker/api/types/mount"
)

type ContainerConfig struct {
	Name      string
	Host      container.HostConfig
	Container container.Config
}

type Container struct {
	ID      string           `json:"id"`
	Image   string           `json:"image"`
	ImageID string           `json:"image_id"`
	Created int64            `json:"created"`
	State   string           `json:"state"`
	Status  string           `json:"status"`
	Names   []string         `json:"names"`
	Ports   []ContainerPort  `json:"ports"`
	Mounts  []ContainerMount `json:"mounts"`
}

type ContainerPort struct {
	IP          string `json:"ip"`
	PrivatePort uint16 `json:"private_port"`
	PublicPort  uint16 `json:"public_port"`
	Type        string `json:"type"`
}

type ContainerMount struct {
	Type        mounttypes.Type `json:"type"`
	Name        string          `json:"name"`
	Source      string          `json:"source"`
	Destination string          `json:"destination"`
}

type ContainerCreated struct {
	ID       string   `json:"id"`
	Warnings []string `json:"warnings"`
}
