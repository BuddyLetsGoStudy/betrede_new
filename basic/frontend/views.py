from django.shortcuts import render

def index(request):
    return render(request, 'frontend/index.html')

def scene(request, format):
    return render(request, 'frontend/index.html')

def space(request, fuck):
    return render(request, 'frontend/index.html')

def fuckyou(request):
    return render(request, 'frontend/index.html', {'globe': True})

def jopa(request, spaceID):
    print(spaceID)
    return render(request, 'frontend/jopa.html', {'spaceID': spaceID})

def globe(request):
    return render(request, 'frontend/globe.html')
