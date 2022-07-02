from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin, Group, GroupAdmin


class CustomGroupAdmin(GroupAdmin):
    pass


class CustomUserAdmin(UserAdmin):
    pass


admin.site.register(get_user_model(), CustomUserAdmin)
admin.site.unregister(Group)
admin.site.register(Group, CustomGroupAdmin)
