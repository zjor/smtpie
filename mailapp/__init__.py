# mailapp/__init__.py

from flask import Flask, render_template, request
from flask_mail import Mail, Message
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

if __name__ == '__main__':
	app.run(debug=False)