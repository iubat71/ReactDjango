from django.contrib import admin

from .models import Users, Auctions

admin.site.register(Users)
admin.site.register(Auctions)