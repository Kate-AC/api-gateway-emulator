FROM nginx:1.19-alpine
LABEL maintainer "Kate-AC<alice.catharsis.kate@gmail.com>"

RUN apk --update add \
  bash \
  && rm -rf /var/cache/apk/*

WORKDIR /api_gateway_emulator/js

COPY ./docker/settings/api_gateway_emulator/nginx.conf   /etc/nginx/
COPY ./docker/settings/api_gateway_emulator/default.conf /etc/nginx/conf.d/
COPY ./docker/settings/api_gateway_emulator/js/*         /api_gateway_emulator/js/

