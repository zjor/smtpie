import json
import traceback

from flask import Flask, render_template, request, \
    jsonify, Blueprint, \
    send_from_directory, \
    redirect, url_for, \
    render_template_string, \
    jsonify

from flask_restplus import Resource, Api, fields
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


send_model = api.model("Email data", {
    "from": fields.String,
    "to": fields.String,
    "subject": fields.String,
    "template": fields.String,
    "templateUrl": fields.String,
    "params": fields.Raw
})


@api.route('/api/send')
class SendController(Resource):

    @api.expect(send_model)
    def post(self):
        args = request.json
        app.logger.info(f"Sending: {args}")
        try:
            msg = Message(
                sender=args["from"],
                recipients=[args["to"]],
                subject=args["subject"],
                html=self.prepare_template(args))

            mail.send(msg)
            return jsonify(success=True)
        except:
            app.logger.error(f"Sending failed: {traceback.format_exc()}")
            return jsonify(success=False, errorMessage=traceback.format_exc())

    def prepare_template(self, data):
        params = data['params'] if 'params' in data else None

        if 'template' in data:
            template_name = f"{data['template']}.html"
            return render_template(template_name, **params)
        elif 'templateUrl' in data:
            template_content = tr.resolve(data['templateUrl'])
            return render_template_string(template_content, **params)
        else:
            raise Exception("Template is not specified")


if __name__ == '__main__':
    app.run(debug=True)
