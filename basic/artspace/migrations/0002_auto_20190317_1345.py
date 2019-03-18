# Generated by Django 2.1.7 on 2019-03-17 13:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('artspace', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artobject',
            name='author',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='artobjects', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='space',
            name='author',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='spaces', to=settings.AUTH_USER_MODEL),
        ),
    ]