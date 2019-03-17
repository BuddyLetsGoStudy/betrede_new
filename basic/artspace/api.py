from .models import ArtObject, Space, Category
from rest_framework import viewsets, permissions
from .serializers import ArtObjectSerializer, SpaceSerializer, CategorySerializer
import django_filters.rest_framework


# Artobject Viewset
class ArtObjectViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ArtObjectSerializer
    queryset = ArtObject.objects.all()
    filter_fields = ('id', 'name', 'author', 'created', 'category')

    # def get_queryset(self):
    #     return self.request.user.leads.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class SpaceViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    serializer_class = SpaceSerializer
    queryset = Space.objects.all()


    # def get_queryset(self):
    #     return self.request.user.leads.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    serializer_class = CategorySerializer
    queryset = Category.objects.all()


    # def get_queryset(self):
    #     return self.request.user.leads.all()

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)
