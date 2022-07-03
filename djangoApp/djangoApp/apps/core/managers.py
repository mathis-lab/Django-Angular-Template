from django.contrib.auth.base_user import BaseUserManager
from django.db.models import QuerySet


import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)


class UserSet(QuerySet):
    pass


class UserManager(BaseUserManager):
    def create_user(
        self,
        email,
        username,
        password=None,
        is_active=True,
        is_staff=False,
        is_admin=False,
    ):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        if not username:
            raise ValueError("Users must have an username")

        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, username, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            email=email,
            username=username,
            password=password,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            username=username,
            password=password,
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user
