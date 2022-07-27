package slice

func Contains(source []string, comparison string) bool {
	for _, item := range source {
		if item == comparison {
			return true
		}
	}

	return false
}
