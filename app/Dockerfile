FROM python:slim

COPY ./requirements.txt /tmp/requirements.txt
WORKDIR /tmp
RUN pip3 install -r requirements.txt

COPY . /app
WORKDIR /app

CMD ["gunicorn", "-w", "3", "-b", ":5000", "-t", "360", "--reload", "run:app"]