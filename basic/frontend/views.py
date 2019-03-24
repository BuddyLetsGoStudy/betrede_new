from django.shortcuts import render

def index(request):
    return render(request, 'frontend/index.html')

def scene(request, format):
    return render(request, 'frontend/index.html')
