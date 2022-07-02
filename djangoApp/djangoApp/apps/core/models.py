from ai_django_core.models import CommonInfo
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy

# Base model
from djangoApp.apps.core.managers import UserManager


class User(AbstractUser):
    objects = UserManager()


class OwnerModel(CommonInfo):
    owner = models.ForeignKey(
        User,
        verbose_name=gettext_lazy("Owned by"),
        related_name="%(app_label)s_%(class)s_owned",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
    )

    class Meta:
        abstract = True
