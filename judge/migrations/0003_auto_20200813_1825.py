# Generated by Django 3.0.7 on 2020-08-13 18:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('judge', '0002_auto_20200813_1727'),
    ]

    operations = [
        migrations.AlterField(
            model_name='submission',
            name='language',
            field=models.CharField(choices=[('Python', 'Python'), ('C++', 'C++'), ('Java', 'Java'), ('C', 'C')], max_length=7),
        ),
    ]
