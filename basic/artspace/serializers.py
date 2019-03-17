from rest_framework import serializers
from .models import ArtObject, Space, Category

# Artobject Serializer
class ArtObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtObject
        fields = '__all__'


class SpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

    
