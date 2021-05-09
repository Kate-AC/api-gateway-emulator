.PHONY: build
build:
	docker-compose build --no-cache

.PHONY: run
run:
	-docker network create api_gateway_emulator
	docker-compose up

.PHONY: down
down:
	docker-compose down
