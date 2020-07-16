# app/mailapp/__init__.py

import json
import traceback

from flask import Flask, render_template, request, \
					jsonify, Blueprint, \
					send_from_directory, \
					redirect, url_for, \
					render_template_string, \
					jsonify

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
	return jsonify(success=True)


@app.route("/api/send", methods=['POST'])
def send():
	data = request.get_json()

	app.logger.info(f"Sending: {data}")

	try:
		msg = Message(
			sender=data["from"],
			recipients=[data["to"]],
			subject=data["subject"],
			html=prepare_template(data))
	
		mail.send(msg)
		return jsonify(success=True)
	except:
		app.logger.error(f"Sending failed: {traceback.format_exc()}")
		return jsonify(success=False, errorMessage=traceback.format_exc())
	

def prepare_template(data):
	if 'template' in data:
		template_name = f"{data['template']}.html"
		return render_template(template_name, **data['params'])
	elif 'templateUrl' in data:
		template_content = tr.resolve(data['templateUrl'])
		return render_template_string(template_content, **data['params'])
	else:
		raise Exception("Template is not specified")


if __name__ == '__main__':
	app.run(host='0.0.0.0')