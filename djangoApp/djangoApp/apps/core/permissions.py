from rest_framework import permissions
from copy import deepcopy


class CustomDjangoModelPermission(permissions.DjangoModelPermissions):
    def __init__(self):
        self.perms_map = deepcopy(
            self.perms_map
        )  # you need deepcopy when you inherit a dictionary type
        self.perms_map["GET"] = ["%(app_label)s.view_%(model_name)s"]


class IsOwnerPermission(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object.
    """

    def has_object_permission(self, request, view, obj):
        # Write permissions are only allowed to the owner of the snippet.
        return (obj.owner == request.user) or request.user.is_staff


class IsOwnerOrReadOnlyPermission(IsOwnerPermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return super().has_object_permission(request, view, obj)


def is_owner(obj, request):
    return (obj.owner == request.user) or request.user.is_staff


def filter_owner(query, request):
    if request.user.is_staff:
        return query
    return query.filter(owner=request.user)
