# api-gateway-emulator

### How to get started

make build  
make run

### API Gateway url
`http://localhost:22280`

### Sample front url
`http://localhost:22281`

### curl examples
`curl -X GET http://localhost:22280/base`  
`curl -X POST http://localhost:22280/base -d '{"value":9999}'`

## How to redirect
If the URI is `/google/redirect`, please change the container name to `google_redirect`.
