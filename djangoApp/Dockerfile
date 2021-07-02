FROM python:3.8.8

RUN pip install --upgrade pip

ENV PYTHONUNBUFFERED 1

COPY requirements.txt /
RUN pip install -r requirements.txt

WORKDIR /djangoApp

COPY . /djangoApp/

COPY entrypoint.sh /
ENTRYPOINT ["sh", "entrypoint.sh"]