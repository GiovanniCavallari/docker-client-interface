package conversion

import "strconv"

func StringToUint16(text string) uint16 {
	value, _ := strconv.Atoi(text)
	return uint16(value)
}
