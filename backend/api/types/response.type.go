package types

type Response struct {
	StatusCode int         `json:"status"`
	Code       string      `json:"code"`
	Message    string      `json:"message"`
	Data       interface{} `json:"data"`
}
