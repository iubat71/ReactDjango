
from django.urls import path,include
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from auctions import views

from auctions import endpoints

urlpatterns = [

    path('api/', include(endpoints)),
    path('admin/', admin.site.urls),
    path('users/', views.UsersList.as_view()),
    path('auctions/', views.AuctionList.as_view()),
    path('auction/<int:id>', views.AuctionBid.as_view()),
    path('logout/', views.Logout.as_view()),
    path('api/auth/', include('knox.urls')),

]

urlpatterns = format_suffix_patterns(urlpatterns)