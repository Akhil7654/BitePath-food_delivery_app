from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name=models.CharField(max_length=50)
    image=models.ImageField(upload_to='menu_images/')

    def __str__(self):
        return self.name

class FoodItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='food_images/')
    category = models.ForeignKey(Category,on_delete=models.CASCADE,related_name='food_items')

    def __str__(self):
        return self.name
    
class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    place = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    phone_no = models.CharField(max_length=15)

    def __str__(self):
        return self.user.username



