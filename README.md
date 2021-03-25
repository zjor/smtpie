# SMTPie

NestJS implementation

## API documentation

[Swagger](http://api.smtpie.xyz/swagger/)

## How to send email locally?

```bash
http :3000/api/v1/mail/send @.local.request.json X-App-ID:smtpie-sendpulse X-Secret:DkG6mLW4FqNGdbYH
http http://api.smtpie.xyz/api/v1/mail/send @.local.request.json X-App-ID:smtpie-sendpulse X-Secret:DkG6mLW4FqNGdbYH
```

## Deployment

### Create ConfigMap with tenants configuration

`kubectl create configmap smtpie-config --from-file=.local.config.yaml -n smtpie`

`kubectl create configmap smtpie-config --from-file=.local.config.yaml -n smtpie -o yaml --dry-run | kubectl replace -f -`

### Check ConfigMap

`kubectl describe configmaps -n smtpie`
