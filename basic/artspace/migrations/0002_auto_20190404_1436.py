# Generated by Django 2.1.7 on 2019-04-04 14:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('artspace', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='space',
            name='artobjects',
            field=models.ManyToManyField(null=True, to='artspace.ArtObjectShadow'),
        ),
    ]