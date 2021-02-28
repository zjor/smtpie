#!/bin/bash

docker run --rm -p 3000:3000 \
  -v $(pwd)/.local.config.yaml:/etc/smtpie/.local.config.yaml \
  -e TENANTS_CONFIG_FILE=/etc/smtpie/.local.config.yaml \
  zjor/smtpie-js