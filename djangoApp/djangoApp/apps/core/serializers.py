from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add extra responses here
        data["email"] = self.user.email
        data["is_superuser"] = self.user.is_superuser
        data["is_staff"] = self.user.is_staff
        data["username"] = self.user.username
        data["groups"] = self.user.groups.values_list("name", flat=True)
        return data


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add extra responses here
        # data["email"] = self.user.email
        # data["is_superuser"] = self.user.is_superuser
        # data["is_staff"] = self.user.is_staff
        # data["username"] = self.user.username
        # data["groups"] = self.user.groups.values_list("name", flat=True)
        return data


class UserRSerializer(serializers.ModelSerializer):
    groups = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")

    class Meta:
        model = get_user_model()
        fields = [
            "username",
            "email",
            "is_superuser",
            "is_staff",
            "groups",
        ]
