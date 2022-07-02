FROM python:3.10.2

RUN pip install --upgrade pip

ENV PYTHONUNBUFFERED 1

COPY requirements.txt /
RUN pip install -r requirements.txt

WORKDIR /djangoApp

COPY . /djangoApp/

ENTRYPOINT ["sh", "entrypoint.sh"]