# app/mailapp/__init__.py

import json

from flask import Flask, render_template, request, \
					jsonify, Blueprint, \
					send_from_directory, \
					redirect, url_for, \
					render_template_string

from flask_mail import Mail, Message
from flask_swagger import swagger
from flask_swagger_ui import get_swaggerui_blueprint
from logging.config import dictConfig

from template_resolver import TemplateResolver


dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
    }},
    'handlers': {'wsgi': {
        'class': 'logging.StreamHandler',
        'stream': 'ext://flask.logging.wsgi_errors_stream',
        'formatter': 'default'
    }},
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi']
    }
})

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

tr = TemplateResolver(app)

@app.route("/")
def index():
	return redirect(SWAGGER_URL)


@app.route("/health")
def health():
	return "OK"


@app.route("/api/send", methods=['POST'])
def send():
	data = request.get_json()

	app.logger.info(f"Sending: {data}")

	msg = Message(
		sender=data["from"],
		recipients=[data["to"]],
		subject=data["subject"],
		html=prepare_template(data))
	try:
		mail.send(msg)
		return "Your message has been sent!"
	except Exception as e:
		app.logger.error(f"Sending failed: {e}")
		return "Sending failed"
	

def prepare_template(data):
	if 'template' in data:
		templateName = f"{data['template']}.html"
		return render_template(template, **data['params'])
	elif 'templateUrl' in data:
		return render_template_string(tr.resolve(data['templateUrl'], **data[params]))


if __name__ == '__main__':
	app.run(host='0.0.0.0')