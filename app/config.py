# app/config.py
from os import environ

SECRET_KEY = environ.get('SECRET_KEY')

MAIL_SERVER = environ.get('MAIL_SERVER')
MAIL_PORT = environ.get('MAIL_PORT')
MAIL_USERNAME = environ.get('MAIL_USERNAME')
MAIL_PASSWORD = environ.get('MAIL_PASSWORD')
SECURITY_EMAIL_SENDER = environ.get('SECURITY_EMAIL_SENDER')
MAIL_USE_SSL = environ.get('MAIL_USE_SSL')

