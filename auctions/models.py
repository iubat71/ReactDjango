from django.db import models

# Create your models here.

class Users(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    password = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Auctions(models.Model):
    id = models.AutoField(primary_key=True)
    owner_id = models.IntegerField(default=1)
    item = models.CharField(max_length=50)
    image = models.URLField()
    starting_bid =  models.IntegerField()
    starting_time = models.DateTimeField(auto_now_add=True)
    ending_time = models.DateTimeField()
    highest_bid = models.FloatField(null=True, default=0)
    winner_id = models.IntegerField(null=True)


    def __str__(self):
        return self.item
