import os

if 'DJANGO_SETTINGS' in os.environ and os.environ['DJANGO_SETTINGS'] == "prod":
    print("PROD SETTINGS")
    from .settings_prod import *
else:
    print("DEV SETTINGS")
    from .settings_dev import *


