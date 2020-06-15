FROM python:slim

#install requirements
COPY ./requirements.txt /tmp/requirements.txt
WORKDIR /tmp
RUN pip3 install -r requirements.txt

#copy app
COPY . /app
WORKDIR /

CMD ["gunicorn", "-w", "3", "-b", ":5000", "-t", "360", "--reload", "app.run:app"]