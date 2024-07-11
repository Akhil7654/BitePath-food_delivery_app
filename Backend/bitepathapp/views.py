from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from .models import FoodItem, Category, Account
from .serializers import FoodItemSerializer, CategorySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
def register(request):
    try:
        data = request.data
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        place = data.get('place')
        city = data.get('city')
        state = data.get('state')
        phone_no = data.get('phone_no')

        if not all([username, email, password, first_name, last_name, place, city, state, phone_no]):
            return Response({'error': 'Please provide all required fields'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        Account.objects.create(
            user=user,
            first_name=first_name,
            last_name=last_name,
            place=place,
            city=city,
            state=state,
            phone_no=phone_no
        )

        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        logger.error(f"Error in registration: {e}")
        return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_user_profile(request):
    try:
        if request.user.is_authenticated:
            account = request.user.account
            profile_data = {
                'username': request.user.username,
                'email': request.user.email,
                'first_name': account.first_name,
                'last_name': account.last_name,
                'place': account.place,
                'city': account.city,
                'state': account.state,
                'phone_no': account.phone_no,
            }
            return Response(profile_data, status=status.HTTP_200_OK)
        return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        logger.error(f"Error fetching user profile: {e}")
        return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout(request):
    request.user.auth_token.delete()
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def get_food_items(request):
    food_items = FoodItem.objects.all()
    serializer = FoodItemSerializer(food_items, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_food_item(request, pk):
    try:
        food_item = FoodItem.objects.get(pk=pk)
    except FoodItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = FoodItemSerializer(food_item)
    return Response(serializer.data)

@api_view(['POST'])
def create_food_item(request):
    serializer = FoodItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_food_item(request, pk):
    try:
        food_item = FoodItem.objects.get(pk=pk)
    except FoodItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = FoodItemSerializer(food_item, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_food_item(request, pk):
    try:
        food_item = FoodItem.objects.get(pk=pk)
    except FoodItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    food_item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_category(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_category(request, pk):
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    category.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_user(request):
    if request.user.is_authenticated:
        return Response({'username': request.user.username})
    return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
