from django.shortcuts import render

def index(request, format):
    return render(request, 'frontend/index.html')
