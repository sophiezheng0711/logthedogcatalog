FROM python:3.7.6

RUN mkdir -p /srv/app/server
WORKDIR /srv/app/server

COPY ./requirements.txt /srv/app/server/requirements.txt

RUN pip install -r requirements.txt

COPY . /srv/app/server

CMD ["python", "app.py"]