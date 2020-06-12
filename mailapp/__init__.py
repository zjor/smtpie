# mailapp/__init__.py

from flask import Flask, render_template
from flask_mail import Mail, Message

app = Flask(__name__)

app.config.from_object('config')

mail= Mail(app)

@app.route("/")
def send():

	sender = app.config.get('MAIL_USERNAME')
	to = ['rzubrytski@gmail.com']
	subject = "Testing"
	html = render_template('coliver.html')

	msg = Message(
		sender=sender,
		recipients=to,
		subject=subject,
		html=html
	)
	mail.send(msg)

	return "Your message has been sent!"

if __name__ == '__main__':
	app.run(debug = False)