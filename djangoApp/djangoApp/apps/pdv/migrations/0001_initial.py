# Generated by Django 3.2 on 2021-07-02 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Pdv',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_client', models.CharField(max_length=4)),
                ('nom', models.CharField(blank=True, default='', max_length=50)),
                ('adresse', models.CharField(blank=True, max_length=200, null=True)),
                ('code_postal', models.CharField(blank=True, max_length=5, null=True)),
                ('commune', models.CharField(blank=True, max_length=100, null=True)),
                ('longitude', models.FloatField(null=True)),
                ('latitude', models.FloatField(null=True)),
                ('surface_commerciale', models.FloatField(null=True)),
                ('etp', models.FloatField(null=True)),
                ('date_creation', models.DateField(null=True)),
                ('telephone', models.CharField(blank=True, max_length=10, null=True)),
            ],
        ),
    ]