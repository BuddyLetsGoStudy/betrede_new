from rest_framework import serializers
from .models import ArtObject, ArtObjectShadow, Space, Category
from drf_extra_fields.fields import Base64ImageField

# Artobject Serializer
class ArtObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtObject
        fields = '__all__'


class ArtObjectShadowSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtObjectShadow
        fields = '__all__'
        depth = 1


class SpaceSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    
    class Meta:
        model = Space
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

    
