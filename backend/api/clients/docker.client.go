package clients

import (
	"context"
	"io"
	"log"
	"os"
	"time"

	"github.com/GiovanniCavallari/docker-interface/api/types"
	dockertypes "github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/filters"
	"github.com/docker/docker/api/types/volume"
	"github.com/docker/docker/client"
	"github.com/gin-gonic/gin"
)

type DockerClient interface {
	ImagePull(ctx *gin.Context, imageName string) error
	ContainersList(ctx *gin.Context) ([]dockertypes.Container, error)
	ContainerLogs(ctx context.Context, containerID string) (io.ReadCloser, error)
	ContainerInspect(ctx *gin.Context, containerID string) (dockertypes.ContainerJSON, error)
	ContainerCreate(ctx *gin.Context, config types.ContainerConfig, containerName string) (container.ContainerCreateCreatedBody, error)
	ContainerStart(ctx *gin.Context, containerID string) error
	ContainerStop(ctx *gin.Context, containerID string) error
	ContainerRemove(ctx *gin.Context, containerID string) error
	VolumesList(ctx *gin.Context) (volume.VolumeListOKBody, error)
	VolumesPrune(ctx *gin.Context) (dockertypes.VolumesPruneReport, error)
	VolumeInspect(ctx *gin.Context, volumeName string) (dockertypes.Volume, error)
	VolumeRemove(ctx *gin.Context, volumeName string) error
}

type dockerClient struct {
	cli *client.Client
}

func NewDockerClient() DockerClient {
	return &dockerClient{
		cli: initClient(),
	}
}

func initClient() *client.Client {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())

	if err != nil {
		log.Panic(err)
	}

	return cli
}

func (c dockerClient) ImagePull(ctx *gin.Context, imageName string) error {
	out, err := c.cli.ImagePull(ctx, imageName, dockertypes.ImagePullOptions{})

	if err != nil {
		return err
	}

	defer out.Close()
	io.Copy(os.Stdout, out)

	return nil
}

func (c dockerClient) ContainersList(ctx *gin.Context) ([]dockertypes.Container, error) {
	return c.cli.ContainerList(ctx, dockertypes.ContainerListOptions{
		All: true,
	})
}

func (c dockerClient) ContainerLogs(ctx context.Context, containerID string) (io.ReadCloser, error) {
	return c.cli.ContainerLogs(ctx, containerID, dockertypes.ContainerLogsOptions{
		ShowStdout: true,
		ShowStderr: true,
		Timestamps: true,
		Details:    true,
		Follow:     true,
	})
}

func (c dockerClient) ContainerInspect(ctx *gin.Context, containerID string) (dockertypes.ContainerJSON, error) {
	return c.cli.ContainerInspect(ctx, containerID)
}

func (c dockerClient) ContainerCreate(ctx *gin.Context, config types.ContainerConfig, containerName string) (container.ContainerCreateCreatedBody, error) {
	return c.cli.ContainerCreate(ctx, &config.Container, &config.Host, nil, nil, containerName)
}

func (c dockerClient) ContainerStart(ctx *gin.Context, containerID string) error {
	return c.cli.ContainerStart(ctx, containerID, dockertypes.ContainerStartOptions{})
}

func (c dockerClient) ContainerStop(ctx *gin.Context, containerID string) error {
	timeout := time.Duration(5 * float64(time.Second))
	return c.cli.ContainerStop(ctx, containerID, &timeout)
}

func (c dockerClient) ContainerRemove(ctx *gin.Context, containerID string) error {
	return c.cli.ContainerRemove(ctx, containerID, dockertypes.ContainerRemoveOptions{
		Force:         true,
		RemoveVolumes: true,
	})
}

func (c dockerClient) VolumesList(ctx *gin.Context) (volume.VolumeListOKBody, error) {
	return c.cli.VolumeList(ctx, filters.Args{})
}

func (c dockerClient) VolumesPrune(ctx *gin.Context) (dockertypes.VolumesPruneReport, error) {
	return c.cli.VolumesPrune(ctx, filters.Args{})
}

func (c dockerClient) VolumeInspect(ctx *gin.Context, volumeName string) (dockertypes.Volume, error) {
	return c.cli.VolumeInspect(ctx, volumeName)
}

func (c dockerClient) VolumeRemove(ctx *gin.Context, volumeName string) error {
	return c.cli.VolumeRemove(ctx, volumeName, true)
}
