SMTPie: a dockerized SMTP-client
================================

Motivation
----------

In many projects, it is necessary to send emails to users. Emails should be rendered from a template. While it is possible to use services like Mailchimp or Mailgun, in some cases it's necessary to have full control over the HTML template being sent. As a result, SMTPie was developed to provide a simple REST API for sending emails.


Features
--------

- template rendering
- allows loading template from the URL or providing as a source string
- allows multiple recipients
- allows multiple SMTP accounts
- API request authorization by appId & secret


Demo
----

Create ``request.json`` file with the following content:

    {
      "from": "service@smtpie.xyz",
      "to": ["<YOUR_EMAIL>"],
      "subject": "Hello world",
      "templateUrl": "https://gitlab.com/shared-living/smtpie/-/raw/master/app/mailapp/templates/default.html",
      "params": {
        "name": "Alice",
        "service": "smtpie"
      }
    }

Issue the following command:
``
curl -X POST http://api.smtpie.xyz/api/v1/mail/send \
    -d @request.json -H "Content-Type: application/json" \
    -H "X-App-ID: smtpie" \
    -H "X-Secret: s3cr3t"
``


.. toctree::
   :maxdepth: 2
   :caption: Contents:



Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
