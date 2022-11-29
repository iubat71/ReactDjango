from django.urls import include, path
from rest_framework import routers

from .api import AuctionViewSet, RegistrationAPI, LoginAPI, UserAPI, LogoutAPI
#from .views import Logout
router = routers.DefaultRouter()
router.register('auctions', AuctionViewSet)

urlpatterns = [
    #url("^", include(router.urls)),
    path("auth/register/", RegistrationAPI.as_view()),
    path("auth/login/", LoginAPI.as_view()),
    path("auth/user/", UserAPI.as_view()),
    path("auth/logout/", LogoutAPI.as_view()),


]