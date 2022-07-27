package types

type ContainerNameUri struct {
	ContainerName string `uri:"container" binding:"required"`
}

type ContainerIdUri struct {
	ContainerID string `uri:"container" binding:"required"`
}

type ComposeStackUri struct {
	Stack string `uri:"stack" binding:"required"`
}

type VolumeNameUri struct {
	VolumeName string `uri:"volume" binding:"required"`
}
