"""djangoApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path
from django.conf.urls import url
from django.views.generic import TemplateView
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from .settings import ENABLE_DJANGO_HOME

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'api-token-auth/', obtain_jwt_token),
    path(r'api-token-refresh/', refresh_jwt_token),

    path("api/pdv/", include("djangoApp.apps.pdv.urls", namespace="pdv")),
]

if ENABLE_DJANGO_HOME:
    urlpatterns.append(
        url(r'^.*', TemplateView.as_view(template_name="home.html"), name="home")
    )
