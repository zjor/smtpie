# app/mailapp/__init__.py

from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
from flask_swagger import swagger
from flask_swagger_ui import get_swaggerui_blueprint
import json

app = Flask(__name__)
app.config.from_object('config')
mail= Mail(app)

@app.route("/")
def get():
	return "Server is running"

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
	mail.send(msg)
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