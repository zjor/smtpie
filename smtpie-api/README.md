# SMTPie

## Sending mail

`http :8080/api/v1/mail/send @.local.request.json X-App-ID:jho7qh X-Secret:k2znhv3ww5da6vb8`

`http http://api.smtpie.xyz/api/v1/mail/send @.local.request.json X-App-ID:jho7qh X-Secret:k2znhv3ww5da6vb8`


## Deployment

### Create ConfigMap with tenants configuration

`kubectl create configmap smtpie-config --from-file=.local.config.yaml -n smtpie`

`kubectl create configmap smtpie-config --from-file=.local.config.yaml -n smtpie -o yaml --dry-run | kubectl replace -f -`

### Check ConfigMap

`kubectl describe configmaps -n smtpie`

## TODO:
- proper errors in endpoints 