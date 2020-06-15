# postemailer

Usage

add .env file to app folder (see env folder with samples)

use SSL parameter for Gmail and TLS for MailGun/Sendgrid in app/config.py

run following: 

gunicorn -w 3 -b :5000 -t 30 --reload app:app

curl 'http://0.0.0.0:5000/api/send' -H 'Content-Type: application/json' -d @parameters.json
