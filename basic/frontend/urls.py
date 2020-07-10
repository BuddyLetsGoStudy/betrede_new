from django.urls import path, re_path
from . import views

urlpatterns = [
   path('login/', views.index),
   path('logout/', views.index),
   path('recovery/<str:fuck>', views.space),
   path('register', views.index),
   path('artobject', views.index),
   path('create', views.index),
   path('mobile/<int:fuck>', views.space),
   path('myspaces', views.index),
   path('fuckyou', views.index),
   path('test/', views.index),
   path('edit/<int:fuck>', views.space),
   path('flat/<int:fuck>', views.space),
   re_path(r'^jopa/(?P<spaceID>[0-9]+)/$', views.jopa),
   # re_path(r'^scene/(?P<format>[0-9]+)/$', views.scene)
   re_path(r'^space/(?P<spaceID>[0-9]+)/$', views.jopa),
   re_path(r'.*', views.globe),

]
