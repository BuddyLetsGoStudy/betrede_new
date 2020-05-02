from django.urls import path, re_path
from . import views

urlpatterns = [
   path('', views.globe),
   path('login/', views.index),
   path('register/', views.index),
   path('artobject/', views.index),
   path('space/', views.index),
   path('profile/', views.index),
   path('fuckyou/', views.index),
   path('test/', views.index),
   path('edit/space/<int:fuck>/', views.space),
   re_path(r'^jopa/(?P<spaceID>[0-9]+)/$', views.jopa),
   # re_path(r'^scene/(?P<format>[0-9]+)/$', views.scene)
   re_path(r'^scene/(?P<spaceID>[0-9]+)/$', views.jopa)

]
