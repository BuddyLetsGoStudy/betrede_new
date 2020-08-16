from django.shortcuts import render

# http://m.127.0.0.1:8000/register
# https://betrede.com/register
# https://m.betrede.com/register

def index(request):
    url = request.build_absolute_uri()
    params = {'mobile': False}

    if url.split('//')[1][0] == 'm':
        params = {'mobile': True}

    return render(request, 'frontend/index.html', params)

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
