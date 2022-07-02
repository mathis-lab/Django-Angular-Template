#!/usr/bin/env sh

python manage.py migrate --no-input
python manage.py collectstatic --no-input
python manage.py init

gunicorn djangoApp.wsgi:application --bind 0.0.0.0:80 --timeout 3600 --workers 6