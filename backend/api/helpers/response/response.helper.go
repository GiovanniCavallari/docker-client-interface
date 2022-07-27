package response

import (
	"net/http"

	"github.com/GiovanniCavallari/docker-interface/api/types"
)

func OkResponse(data interface{}) types.Response {
	return types.Response{
		StatusCode: http.StatusOK,
		Code:       http.StatusText(http.StatusOK),
		Data:       data,
	}
}

func CreatedResponse(data interface{}) types.Response {
	return types.Response{
		StatusCode: http.StatusCreated,
		Code:       http.StatusText(http.StatusCreated),
		Data:       data,
	}
}

func BadRequestResponse(err error) types.Response {
	return types.Response{
		StatusCode: http.StatusBadRequest,
		Code:       http.StatusText(http.StatusBadRequest),
		Message:    err.Error(),
	}
}

func NotFoundResponse(message string) types.Response {
	return types.Response{
		StatusCode: http.StatusNotFound,
		Code:       http.StatusText(http.StatusNotFound),
		Message:    message,
	}
}

func InternalServerErrorResponse(err error) types.Response {
	return types.Response{
		StatusCode: http.StatusInternalServerError,
		Code:       http.StatusText(http.StatusInternalServerError),
		Message:    err.Error(),
	}
}
