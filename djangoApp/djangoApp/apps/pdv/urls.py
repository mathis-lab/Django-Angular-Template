from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import PdvLC, PdvRUD

app_name = "pdv"
urlpatterns = [
    path('', PdvLC.as_view()),
    path('<int:pk>/', PdvRUD.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
