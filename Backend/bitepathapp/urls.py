from django.urls import path
from bitepathapp import views


urlpatterns = [
    path('food-items/',views.get_food_items,name='get_food_items'),
    path('food-items/<int:pk>/',views.get_food_item,name='get_food_item'),
    path('food-items/create/',views.create_food_item,name='create_food_item'),
    path('food-items/update/<int:pk>/',views.update_food_item,name='update_food_item'),
    path('food-items/delete/<int:pk>/',views.delete_food_item,name='delete_food_item'),
    path('categories/', views.get_categories, name='get_categories'),
    path('categories/create/', views.create_category, name='create_category'),
    path('categories/delete/<int:pk>/', views.delete_category, name='delete_category'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('user/', views.get_user, name='get_user'),
     path('user-profile/', views.get_user_profile, name='get_user_profile'),
]