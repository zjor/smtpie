#!/bin/bash

IMAGE_NAME="smtpie:latest"
DOCKER_ID_USER="zjor"

set -x 

docker build -t ${IMAGE_NAME} ./app

docker tag ${IMAGE_NAME} ${DOCKER_ID_USER}/${IMAGE_NAME}