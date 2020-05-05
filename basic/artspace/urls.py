from rest_framework import routers
from .api import ArtObjectViewSet, ArtObjectShadowViewSet, SpaceViewSet, CategoryViewSet

router = routers.DefaultRouter()
router.register('artobjects', ArtObjectViewSet, 'artobjects')
router.register('artobjectsshadows', ArtObjectShadowViewSet, 'artobjects')
router.register('spaces', SpaceViewSet, 'spaces')
router.register('categories', CategoryViewSet, 'categories')

urlpatterns = router.urls
print(urlpatterns)
