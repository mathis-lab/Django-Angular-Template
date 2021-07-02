#!/usr/bin/env sh

python manage.py migrate --no-input
python manage.py collectstatic --no-input

gunicorn djangoApp.wsgi:application --bind 0.0.0.0:80 --timeout 360