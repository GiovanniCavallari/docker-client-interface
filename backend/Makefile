.PHONY: help build run dev
help:
	@grep -E '^[a-zA-Z-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "[32m%-15s[0m %s\n", $$1, $$2}'

run: ## Build binary file and run the application
	make build; \
	cd ./api; \
	chmod 777 ./api; \
	./api

dev: ## Run the application without generating binary file
	go run api/main.go

build: ## Generate application binary file
	@cd ./api/main.go; \
	go build
