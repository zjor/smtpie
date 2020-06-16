# postemailer

## Usage

add .env file to app folder (see env folder with samples)

use SSL parameter for Gmail and TLS for MailGun/Sendgrid in app/config.py

run following: 

gunicorn -w 3 -b :5000 -t 30 --reload run:app

curl 'http://0.0.0.0:5000/api/send' -H 'Content-Type: application/json' -d @parameters.json

## Running app docker image

1. Build an image: `docker build -t emailer .`
2. Create `.env` file
3. Run an image `docker run --rm -p 5000:5000 -v $PWD/.env:/app/.env emailer`

## Running with docker-compose

1. Make sure `.env` file exists in the project's root directory
2. Run `docker-compose up`
3. Navigate to `http://localhost:8080/` URL