#!/bin/bash

set -x

docker run --rm -p 5000:5000 \
	-v $PWD/.env:/app/.env \
	-v $PWD/.templates:/app/mailapp/templates \
	smtpie