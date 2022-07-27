package mappers

import (
	"github.com/GiovanniCavallari/docker-interface/api/helpers/time"
	"github.com/GiovanniCavallari/docker-interface/api/types"
	dockertypes "github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/volume"
)

type VolumeMapper interface {
	MapVolumesListBodyToResponse(volumes volume.VolumeListOKBody) []types.Volume
	MapSingleVolumeToResponse(volume *dockertypes.Volume) types.Volume
	MapVolumesPruneReportToResponse(report dockertypes.VolumesPruneReport) types.VolumePruneReport
}

type volumeMapper struct{}

func NewVolumeMapper() VolumeMapper {
	return &volumeMapper{}
}

func (m volumeMapper) MapVolumesListBodyToResponse(list volume.VolumeListOKBody) []types.Volume {
	var volumes []types.Volume

	for _, volume := range list.Volumes {
		volumes = append(volumes, m.MapSingleVolumeToResponse(volume))
	}

	return volumes
}

func (m volumeMapper) MapSingleVolumeToResponse(volume *dockertypes.Volume) types.Volume {
	return types.Volume{
		Name:        volume.Name,
		Driver:      volume.Driver,
		Scope:       volume.Scope,
		Status:      volume.Status,
		Source:      volume.Mountpoint,
		Destination: volume.Name,
		Created:     time.ToTimestamp(volume.CreatedAt),
	}
}

func (m volumeMapper) MapVolumesPruneReportToResponse(report dockertypes.VolumesPruneReport) types.VolumePruneReport {
	return types.VolumePruneReport{
		VolumesDeleted:  report.VolumesDeleted,
		SpaceReclaimend: report.SpaceReclaimed,
	}
}
