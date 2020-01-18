from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class ModelBase(models.Model):
    class Meta:
        abstract = True

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "{}".format(self.name)


class Category(ModelBase):
    class Meta:
        verbose_name_plural = 'Categories'
    pass


class ArtObject(ModelBase):
    upload = models.FileField(upload_to='media')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    author = models.ForeignKey(User, related_name='artobjects', on_delete=models.CASCADE, null=True)
    width = models.FloatField(default=1.0)
    height = models.FloatField(default=1.7)
    

class ArtObjectShadow(models.Model):
    artobject = models.ForeignKey(ArtObject, on_delete=models.CASCADE, null=True)
    position = models.IntegerField(max_length=4)


class Space(ModelBase):
    artobjects = models.ManyToManyField(ArtObjectShadow, null=True)
    geo = models.TextField(max_length=200, blank=True)
    author = models.ForeignKey(User, related_name='spaces', on_delete=models.CASCADE, null=True)
    views = models.IntegerField(default=0)

    def add_view(self):
        self.views += 1
        self.save()
