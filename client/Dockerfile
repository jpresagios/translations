# base image
FROM node:10.16.0-alpine as build

COPY . /workplace

WORKDIR /workplace

RUN apk update && apk --no-cache --virtual .build-deps add \
	python \
	libsass \
	make \
	g++ \
	git && \
	git config --global http.sslverify "false" && \
	npm i && \
	apk del .build-deps

RUN npm run build

FROM nginx:alpine

# COPY INCLUDES FILES
COPY ./docker/inc/nginx.conf /etc/nginx/
COPY ./docker/inc/default.conf /etc/nginx/conf.d/

RUN mkdir -p /usr/share/nginx/html
COPY --from=build /workplace/dist/ /usr/share/nginx/html/

WORKDIR /usr/share/nginx/

CMD nginx -g 'daemon off;'