# Generated by Django 3.0.7 on 2020-08-17 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('judge', '0006_submission_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='submission',
            name='problem_name',
            field=models.CharField(blank=True, max_length=25),
        ),
    ]
