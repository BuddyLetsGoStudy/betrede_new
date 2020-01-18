from .models import ArtObject, ArtObjectShadow, Space, Category
from rest_framework import viewsets, permissions
from .serializers import ArtObjectSerializer, ArtObjectShadowSerializer, SpaceSerializer, CategorySerializer
import django_filters.rest_framework


# Artobject Viewset
class ArtObjectViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ArtObjectSerializer
    filter_fields = ('id', 'name', 'author', 'created', 'category')

    def get_queryset(self):
        return ArtObject.objects.all().order_by('created')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ArtObjectShadowViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ArtObjectShadowSerializer
    queryset = ArtObjectShadow.objects.all()
    # filter_fields = ('id', 'name', 'author', 'created', 'category')

    # def get_queryset(self):
    #     return ArtObject.objects.all().order_by('created')

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)


class SpaceViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = SpaceSerializer
    queryset = Space.objects.all()


    def get_queryset(self):
        for space in Space.objects.all().order_by('-created'):
            print(space.author)
        return Space.objects.all().order_by('-created')

    def perform_create(self, serializer):
        artObjectsIDs = self.request.data['artObjects']
        pos = 1
        artObjectsShadowsIDs = []
        for artObjectID in artObjectsIDs:
            artObject = ArtObject.objects.get(id=artObjectID)
            newArtObjectShadow = ArtObjectShadow(artobject=artObject,position=pos)
            newArtObjectShadow.save()
            artObjectsShadowsIDs.append(newArtObjectShadow.id)
            pos += 1
        print(self.request.data['artObjects'])
        serializer.save(author=self.request.user, artobjects=artObjectsIDs)

class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = CategorySerializer
    queryset = Category.objects.all()


    # def get_queryset(self):
    #     return self.request.user.leads.all()

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)
