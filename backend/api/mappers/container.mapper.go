package mappers

import (
	"github.com/GiovanniCavallari/docker-interface/api/helpers/conversion"
	"github.com/GiovanniCavallari/docker-interface/api/helpers/time"
	"github.com/GiovanniCavallari/docker-interface/api/types"

	dockertypes "github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/go-connections/nat"
)

type ContainerMapper interface {
	MapDockerContainersToResponse(containers []dockertypes.Container) []types.Container
	MapSingleDockerContainerToResponse(container dockertypes.Container) types.Container
	MapContainerCreatedBodyToResponse(container container.ContainerCreateCreatedBody) types.ContainerCreated
	MapContainerJsonToResponse(container dockertypes.ContainerJSON) types.Container
}

type containerMapper struct{}

func NewContainerMapper() ContainerMapper {
	return &containerMapper{}
}

func (m containerMapper) MapDockerContainersToResponse(containers []dockertypes.Container) []types.Container {
	var mapper []types.Container

	for _, container := range containers {
		mapper = append(mapper, m.MapSingleDockerContainerToResponse(container))
	}

	return mapper
}

func (m containerMapper) MapSingleDockerContainerToResponse(container dockertypes.Container) types.Container {
	var ports []types.ContainerPort
	for _, port := range container.Ports {
		ports = append(ports, types.ContainerPort{
			IP:          port.IP,
			PrivatePort: port.PrivatePort,
			PublicPort:  port.PublicPort,
			Type:        port.Type,
		})
	}

	var mounts []types.ContainerMount
	for _, mount := range container.Mounts {
		mounts = append(mounts, types.ContainerMount{
			Type:        mount.Type,
			Name:        mount.Name,
			Source:      mount.Source,
			Destination: mount.Destination,
		})
	}

	return types.Container{
		ID:      container.ID,
		Image:   container.Image,
		ImageID: container.ImageID,
		Created: container.Created,
		State:   container.State,
		Status:  container.Status,
		Names:   container.Names,
		Ports:   ports,
		Mounts:  mounts,
	}
}

func (m containerMapper) MapContainerJsonToResponse(container dockertypes.ContainerJSON) types.Container {
	var ports []types.ContainerPort
	for port, binding := range container.NetworkSettings.Ports {
		var host nat.PortBinding
		if binding != nil {
			host = binding[len(binding)-1]
		}

		ports = append(ports, types.ContainerPort{
			IP:          host.HostIP,
			PrivatePort: conversion.StringToUint16(port.Port()),
			PublicPort:  conversion.StringToUint16(host.HostPort),
			Type:        port.Proto(),
		})
	}

	var mounts []types.ContainerMount
	for _, mount := range container.Mounts {
		mounts = append(mounts, types.ContainerMount{
			Type:        mount.Type,
			Name:        mount.Name,
			Source:      mount.Source,
			Destination: mount.Destination,
		})
	}

	return types.Container{
		ID:      container.ID,
		Image:   container.Config.Image,
		ImageID: container.Image,
		Created: time.ToTimestamp(container.Created),
		State:   container.State.Status,
		Status:  container.State.Status,
		Names: []string{
			container.Name,
		},
		Ports:  ports,
		Mounts: mounts,
	}
}

func (m containerMapper) MapContainerCreatedBodyToResponse(container container.ContainerCreateCreatedBody) types.ContainerCreated {
	return types.ContainerCreated{
		ID:       container.ID,
		Warnings: container.Warnings,
	}
}
