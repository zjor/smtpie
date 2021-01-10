#!/bin/bash
#
# Produce a Docker image
#

# be verbose and fail fast
echo "PWD: ${PWD}"
set -x -e

CONTEXT_DIR="target/docker"
REPOSITORY="smtpie-multitenant"
TAG="latest"
IMAGE_NAME="${REPOSITORY}:${TAG}"
#VCS_REF="$(cat ./.vcs_ref)"
VCS_REF="123"
DOCKER_ID_USER="zjor"

mvn clean install -DskipTests

mkdir -p "${CONTEXT_DIR}"
cp -- Dockerfile target/smtpie.jar "${CONTEXT_DIR}"

# Build Docker image
echo -e "\n == Building docker image ${IMAGE_NAME} =="
docker build --build-arg VCS_REF="${VCS_REF}" -t "${IMAGE_NAME}" "${CONTEXT_DIR}"
docker tag ${IMAGE_NAME} $DOCKER_ID_USER/${IMAGE_NAME}
