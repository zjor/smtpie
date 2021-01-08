# SMTPie

## Sending mail

`http :8080/api/v1/mail/send @.local.request.json X-App-ID:jho7qh X-Secret:k2znhv3ww5da6vb8`

`http http://smtpie.176.102.64.189.xip.io/api/v1/mail/send @.local.request.json X-App-ID:jho7qh X-Secret:k2znhv3ww5da6vb8`


## Deployment

### Create ConfigMap with tenants configuration

`kubectl create configmap smtpie-config --from-file=.local.config.yaml -n smtpie`

### Check ConfigMap

`kubectl describe configmaps -n smtpie` 