# Generated by Django 3.0.7 on 2020-07-27 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserDetails', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdetails',
            name='college',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]