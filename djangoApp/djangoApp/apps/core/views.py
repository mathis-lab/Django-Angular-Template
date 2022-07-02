import django_filters
from django.contrib.auth import get_user_model
from django.db.models import ProtectedError
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response

from .permissions import (
    IsOwnerPermission,
    CustomDjangoModelPermission,
    IsOwnerOrReadOnlyPermission,
    filter_owner,
)


import logging

# Get an instance of a logger
from .serializers import (
    CustomTokenObtainPairSerializer,
    CustomTokenRefreshSerializer,
    UserRSerializer,
)

logger = logging.getLogger(__name__)


class CustomListCreateAPIView(ListCreateAPIView):
    permission_classes = (CustomDjangoModelPermission,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CustomIsOwnerListCreateAPIView(CustomListCreateAPIView):
    def get_queryset(self):
        return filter_owner(super().get_queryset(), self.request)


class CustomRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    def delete(self, request, *args, **kwargs):
        try:
            return super().delete(request, *args, **kwargs)
        except ProtectedError as e:
            data = {
                "code": "protected_error",
                "detail": "Suppression impossible, cet objet est utilisé ailleurs dans l'application.",
                "error": {"type": str(type(e)), "message": str(e)},
            }
            return JsonResponse(data=data, status=status.HTTP_400_BAD_REQUEST)


class InitUserView(APIView):
    @staticmethod
    def put(request):
        if request.user.is_superuser:
            get_user_model().objects.init_table()


class IsOwnerAPIView:
    permission_classes = (CustomDjangoModelPermission, IsOwnerPermission)


class IsOwnerOrReadOnlyAPIView:
    permission_classes = (CustomDjangoModelPermission, IsOwnerOrReadOnlyPermission)


class JustIsOwnerAPIView:
    permission_classes = (IsOwnerPermission,)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer


class NumberInFilter(django_filters.BaseInFilter, django_filters.NumberFilter):
    pass


class UserView(APIView):
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def get(request):
        print("here")
        instance = request.user
        serializer = UserRSerializer(instance)
        return Response(serializer.data)
