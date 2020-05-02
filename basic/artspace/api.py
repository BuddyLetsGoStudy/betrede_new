from .models import ArtObject, ArtObjectShadow, Space, Category
from rest_framework import viewsets, permissions
from .serializers import ArtObjectSerializer, ArtObjectShadowSerializer, SpaceSerializer, CategorySerializer
import django_filters.rest_framework
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status


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


    # def partial_update(self, request, *args, **kwargs):
    #     print(self.request.data)
    #     self.serializer.save(partial=True)
        # instance = self.get_object()
        # serializer = self.serializer(instance, data=request.data, partial=True)
        # serializer.save(instance, data=request.data, partial=True)

        # new_instance = serializer.save()
        # return Response(serializer.data)

        # try:
        #     instance = self.get_object()
        #     if self.request.user == instance.author:
        #         self.perform_destroy(instance)
        # except Http404:
        #     pass


class ArtObjectShadowViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ArtObjectShadowSerializer
    queryset = ArtObjectShadow.objects.all()
    filter_fields = ('artobject', 'position')

    def get_queryset(self):
        return ArtObjectShadow.objects.all()

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)


class SpaceViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = SpaceSerializer
    queryset = Space.objects.all()
    filter_fields = ('id', 'artobjects', 'author')


    def get_queryset(self):
        for space in Space.objects.all().order_by('-created'):
            print(space.author)
        return Space.objects.all().order_by('-created')

    def perform_create(self, serializer):
        artObjectsIDs = self.request.data['artObjects']
        if artObjectsIDs:
            pos = 1
            artObjectsShadowsIDs = []
            for artObjectID in artObjectsIDs:
                print(artObjectID)
                if artObjectID != 0:
                    artObject = ArtObject.objects.get(id=int(artObjectID))
                    newArtObjectShadow = ArtObjectShadow(artobject=artObject,position=pos)
                    newArtObjectShadow.save()
                    artObjectsShadowsIDs.append(newArtObjectShadow.id)
                pos += 1
            print(self.request.data['artObjects'])
            serializer.save(author=self.request.user, artobjects=artObjectsShadowsIDs)
        else:
            raise Http404

    def destroy(self, request, pk=None):
        try:
            instance = self.get_object()
            if self.request.user == instance.author:
                self.perform_destroy(instance)
        except Http404:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_permissions(self):
        if self.action == 'destroy':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]



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
