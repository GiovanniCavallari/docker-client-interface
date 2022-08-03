package types

type ContainerDto struct {
	Name         string                  `json:"name" binding:"required"`
	Image        string                  `json:"image" binding:"required"`
	Links        []string                `json:"links"`
	Env          []string                `json:"env"`
	Mounts       []ContainerMountDto     `json:"mounts"`
	ExposedPorts []ContainerExposedPorts `json:"exposed_ports" binding:"required"`
}

type ContainerExposedPorts struct {
	HostPort      string `json:"host_port"`
	ContainerPort string `json:"container_port"`
}

type ContainerMountDto struct {
	Name   string `json:"name" binding:"required"`
	Target string `json:"target" binding:"required"`
}
