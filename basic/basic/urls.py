from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', include('accounts.urls')),
    path('api/', include('artspace.urls')),
    path('', include('frontend.urls'))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
