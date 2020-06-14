# postemailer

Usage

add .env file to root (see env folder with samples)

use SSL parameter for Gmail and TLS for MailGun/Sendgrid in config.py 

python3 app.py http://127.0.0.1:8080/

curl 'http://127.0.0.1:8080/api/send' -H 'Content-Type: application/json' -d @parameters.json
