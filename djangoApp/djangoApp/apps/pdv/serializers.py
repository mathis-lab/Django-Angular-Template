from rest_framework.serializers import ModelSerializer, DateField
from djangoApp.apps.pdv.models import Pdv


class PdvSerializer(ModelSerializer):
    #date_creation = DateField(format="%d/%m/%Y", required=False, read_only=True)

    class Meta:
        model = Pdv
        fields = ['id',
                  'id_client',
                  'nom',
                  'adresse',
                  'code_postal',
                  'commune',
                  'longitude',
                  'latitude',
                  'surface_commerciale',
                  'etp',
                  'date_creation',
                  'telephone']


class PdvUSerializer(ModelSerializer):
    date_creation = DateField(format="%d/%m/%Y", required=False, read_only=False, allow_null=True)

    class Meta:
        model = Pdv
        fields = ['id',
                  'nom',
                  'adresse',
                  'code_postal',
                  'commune',
                  'longitude',
                  'latitude',
                  'surface_commerciale',
                  'etp',
                  'date_creation',
                  'telephone']


class PdvLSerializer(ModelSerializer):
    class Meta:
        model = Pdv
        fields = ['id',
                  'id_client',
                  'nom']
