package types

type ComposeConfig struct {
	Name         string
	Dependencies []string
}

type ComposeContainer struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Error   bool   `json:"error"`
	Message string `json:"message"`
}
