# app/mailapp/__init__.py

from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
from flask_swagger import swagger
from flask_swagger_ui import get_swaggerui_blueprint
from threading import Thread
import json

app = Flask(__name__)
app.config.from_object('config')
mail= Mail(app)

@app.route("/")
def get():
	return "Server is running"

def send_async_email(app, msg):
	with app.app_context():
		mail.send(msg)

@app.route("/api/send", methods=['POST'])
def send():

	data = request.get_json()
	html = render_template(data["html"], **data["params"])
	msg = Message(
		sender=data["from"],
		recipients=[data["to"]],
		subject=data["subject"],
		html=html
	)
	thread = Thread(target=send_async_email, args=(app, msg))
	thread.start()
	return "Your message has been sent!"

@app.route("/api/spec")
def spec():
	swag = swagger(app, prefix='/api')
	swag['info']['base'] = "http://0.0.0.0:5000"
	swag['info']['version'] = "1.0"
	swag['info']['title'] = "Postemailer"
	return jsonify(swag)

if __name__ == '__main__':
	app.run(host='0.0.0.0')