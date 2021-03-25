# SMTPie

RESTful SMTP client

## Features

- template rendering
- fetches and caches templates from URL
- SMTP credentials encapsulation
- multitenancy support (allows sending from different SMTP servers)
- quota limits support (max recipients, hourly limits)

[API documentation](http://api.smtpie.xyz/swagger/)

## How to send an email?

```bash
http :3000/api/v1/mail/send @.local.request.json X-App-ID:smtpie-sendpulse X-Secret:DkG6mLW4FqNGdbYH
```

```bash
http http://api.smtpie.xyz/api/v1/mail/send @.local.request.json X-App-ID:smtpie-sendpulse X-Secret:DkG6mLW4FqNGdbYH
```

`.local.request.json`:
```json
{
  "from": "service@smtpie.xyz",
  "to": [
    "alice@example.com"
  ],
  "subject": "Hello world",
  "templateUrl": "<YOUR_TEMPLATE_URL>",
  "params": {
    "<ATTR>": "<VALUE>"
  }
}
```

## Deployment

### Create ConfigMap with tenants configuration

`kubectl create configmap smtpie-config --from-file=.local.config.yaml -n smtpie`

`kubectl create configmap smtpie-config --from-file=.local.config.yaml -n smtpie -o yaml --dry-run | kubectl replace -f -`

### Check ConfigMap

`kubectl describe configmaps -n smtpie`
