from django.urls import path, re_path
from . import views

urlpatterns = [
   path('', views.index),
   path('login/', views.index),
   path('register/', views.index),
   path('artobject/', views.index),
   path('space/', views.index),

]
