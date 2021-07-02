from django.db import models
from datetime import datetime

# Create your models here.
from djangoApp.apps.pdv.managers import PdvSet


class Pdv(models.Model):
    id_client = models.CharField(max_length=4)
    nom = models.CharField(max_length=50, blank=True, default="")
    adresse = models.CharField(max_length=200, blank=True, null=True)
    code_postal = models.CharField(max_length=5, blank=True, null=True)
    commune = models.CharField(max_length=100, blank=True, null=True)
    longitude = models.FloatField(null=True)
    latitude = models.FloatField(null=True)
    surface_commerciale = models.FloatField(null=True)
    etp = models.FloatField(null=True)
    date_creation = models.DateField(null=True)
    telephone = models.CharField(max_length=10, blank=True, null=True)

    objects = PdvSet.as_manager()

    def __str__(self):
        return f"Pdv {self.pk}"
