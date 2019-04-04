from rest_framework import serializers
from .models import ArtObject, ArtObjectShadow, Space, Category

# Artobject Serializer
class ArtObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtObject
        fields = '__all__'


class ArtObjectShadowSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtObjectShadow
        fields = '__all__'


class SpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

    
