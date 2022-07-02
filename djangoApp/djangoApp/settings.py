import os

if os.environ.get("ENV") in ["prod", "preprod"]:
    from .settings_prod import *
else:
    from .settings_dev import *
