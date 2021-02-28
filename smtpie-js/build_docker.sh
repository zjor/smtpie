#!/bin/bash

set -x

yarn install

yarn build

IMAGE_NAME=smtpie-js
DOCKER_ID_USER=zjor

docker build -t ${IMAGE_NAME} .

docker tag ${IMAGE_NAME} ${DOCKER_ID_USER}/${IMAGE_NAME}
