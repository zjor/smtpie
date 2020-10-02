import json
import traceback

from flask import Flask, render_template, request, \
					jsonify, Blueprint, \
					send_from_directory, \
					redirect, url_for, \
					render_template_string, \
					jsonify

from flask_restplus import Resource, Api
from flask_mail import Mail, Message

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
api = Api(app)
mail = Mail(app)

tr = TemplateResolver(app)

@api.route('/health')
class HealthController(Resource):
	def get(self):
		return jsonify(success=True)


req_parser = api.parser()
req_parser.add_argument('from', location='json', type=str, required=True)
req_parser.add_argument('to', location='json', type=str, required=True)
req_parser.add_argument('subject', location='json', type=str, required=True)
req_parser.add_argument('template', location='json', type=str)
req_parser.add_argument('templateUrl', location='json', type=str)

@api.route('/api/send')
@api.expect(req_parser)
class SendController(Resource):
	def post(self):

		app.logger.info(f"Sending: {args}")

		try:
			msg = Message(
				sender=args["from"],
				recipients=[args["to"]],
				subject=args["subject"],
				html=prepare_template(args))
		
			mail.send(msg)
			return jsonify(success=True)
		except:
			app.logger.error(f"Sending failed: {traceback.format_exc()}")
			return jsonify(success=False, errorMessage=traceback.format_exc())


	def prepare_template(self, data):
		if 'template' in data:
			template_name = f"{data['template']}.html"
			return render_template(template_name, **data['params'])
		elif 'templateUrl' in data:
			template_content = tr.resolve(data['templateUrl'])
			return render_template_string(template_content, **data['params'])
		else:
			raise Exception("Template is not specified")



if __name__ == '__main__':
	app.run(debug=True)