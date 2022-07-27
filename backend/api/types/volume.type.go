package types

type Volume struct {
	Name        string                 `json:"name"`
	Driver      string                 `json:"driver"`
	Scope       string                 `json:"scope"`
	Status      map[string]interface{} `json:"status"`
	Source      string                 `json:"source"`
	Destination string                 `json:"destination"`
	Created     int64                  `json:"created"`
}

type VolumePruneReport struct {
	VolumesDeleted  []string `json:"volumes_deleted"`
	SpaceReclaimend uint64   `json:"space_reclaimed"`
}
