FROM nginx:1.19-alpine
LABEL maintainer "Kate-AC<alice.catharsis.kate@gmail.com>"

RUN apk --update add \
  bash \
  && rm -rf /var/cache/apk/*

WORKDIR /test_html

COPY ./docker/settings/test_html/default.conf /etc/nginx/conf.d/

