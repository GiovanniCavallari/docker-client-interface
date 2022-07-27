package time

import (
	"time"
)

func ToTimestamp(value string) int64 {
	t, err := time.Parse(time.RFC3339, value)

	if err != nil {
		return 0
	}

	return t.Unix()
}
