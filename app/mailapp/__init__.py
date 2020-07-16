# app/mailapp/__init__.py

from flask import Flask, render_template, request, \
					jsonify, Blueprint, \
					send_from_directory, \
					redirect, url_for

from flask_mail import Mail, Message
from flask_swagger import swagger
from flask_swagger_ui import get_swaggerui_blueprint
from threading import Thread
import json

app = Flask(__name__)
app.config.from_object('config')
mail= Mail(app)

SWAGGER_URL = '/docs/spec'
API_URL = '/static/swagger.json'

swaggerui = get_swaggerui_blueprint(
	SWAGGER_URL,
	API_URL
)

app.register_blueprint(swaggerui, url_prefix=SWAGGER_URL)


@app.route("/")
def get():
	return redirect(url_for(SWAGGER_URL))


@app.route("/health")
def get():
	return "OK"


@app.route("/api/send", methods=['POST'])
def send():

	data = request.get_json()
	template = f"{data['template']}.html"
	html = render_template(template, **data["params"])
	msg = Message(
		sender=data["from"],
		recipients=[data["to"]],
		subject=data["subject"],
		html=html)
	try:
		mail.send(msg)
		return "Your message has been sent!"
	except Exception as e:
		print(e)
		return "Sending failed"
	

if __name__ == '__main__':
	app.run(host='0.0.0.0')