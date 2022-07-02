import os
from django.core.management.utils import get_random_secret_key


class Database:
    NAME = os.getenv("POSTGRES_DB")
    USER = os.getenv("POSTGRES_USER")
    PASSWORD = os.getenv("POSTGRES_PASSWORD")
    HOST = os.getenv("DATABASE_HOST")
    PORT = os.getenv("DATABASE_PORT")


class Secrets:
    SECRET_KEY = os.getenv("SECRET_KEY")
    SERVER_ADDRESS = os.getenv("SERVER_ADDRESS")


class Mail:
    USER = os.getenv("EMAIL_HOST_USER")
    PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
    pass
