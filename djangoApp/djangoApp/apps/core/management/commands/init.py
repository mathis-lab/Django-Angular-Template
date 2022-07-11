from django.core.management.base import BaseCommand
from django.apps import apps


class Command(BaseCommand):
    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("Init database..."))
        apps.get_model("core", "User").objects.init_table()
        self.stdout.write(self.style.SUCCESS("Database init success !"))
