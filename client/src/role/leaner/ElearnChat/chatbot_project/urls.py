from django.contrib import admin
from django.urls import path
from chatbot import views

urlpatterns = [
    path('', views.chat, name='chat'),
    
]
