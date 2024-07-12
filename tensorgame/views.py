from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    #return HttpResponse('<h4>12</h4>')
    return render(request, 'Index.html')