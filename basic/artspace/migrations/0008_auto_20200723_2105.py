# Generated by Django 2.1.7 on 2020-07-23 21:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('artspace', '0007_auto_20200723_2104'),
    ]

    operations = [
        migrations.AlterField(
            model_name='space',
            name='avatar',
            field=models.FileField(blank=True, max_length=255, upload_to='img/'),
        ),
    ]
