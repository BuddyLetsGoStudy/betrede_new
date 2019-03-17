from rest_framework import routers
from .api import ArtObjectViewSet, SpaceViewSet, CategoryViewSet

router = routers.DefaultRouter()
router.register('api/artobjects', ArtObjectViewSet, 'artobjects')
router.register('api/spaces', SpaceViewSet, 'spaces')
router.register('api/categories', CategoryViewSet, 'categories')



urlpatterns = router.urls
