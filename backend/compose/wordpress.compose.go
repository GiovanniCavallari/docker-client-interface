package compose

import "github.com/GiovanniCavallari/docker-interface/api/types"

func GetWordpressComposeConfig() types.ComposeConfig {
	return types.ComposeConfig{
		Name: "wordpress",
		Dependencies: []string{
			"mysql",
			"adminer",
			"wordpress",
		},
	}
}
