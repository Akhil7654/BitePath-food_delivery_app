from rest_framework import serializers
from .models import FoodItem,Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields='__all__'

class FoodItemSerializer(serializers.ModelSerializer):
    category=CategorySerializer()
    class Meta:
        model = FoodItem
        fields = '__all__'

