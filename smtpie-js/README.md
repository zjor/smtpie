# SMTPie
   
A dockerized SMTPie client with multi-tenancy support

## Features

- multiple SMTP accounts
- template rendering

## Testing

- send email
    - `http :3000/api/v1/mail/send @sample-request.json X-App-ID:smtpie-sendpulse X-Secret:DkG6mLW4FqNGdbYH`
    - `http http://api.smtpie.xyz/api/v1/mail/send @sample-request.json X-App-ID:smtpie-sendpulse X-Secret:DkG6mLW4FqNGdbYH`

- get sending statistics
`http :3000/stats`
  
- invalidate template cache
`http :3000/stats/invalidate-cache`