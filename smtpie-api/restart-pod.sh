#!/bin/bash
set -x
NS=smtpie
SELECTOR="app=smtpie"
POD_NAME=`kubectl get pods -n ${NS} --selector=${SELECTOR} --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}'`
kubectl delete pod ${POD_NAME} -n ${NS}