#!/bin/bash

docker run --rm \
  -v $(PWD)/.local.config.yaml:/.local.config.yaml \
  -e TENANTS_CONFIG_FILE=/.local.config.yaml \
  -p 8080:8080 smtpie-multitenant:latest