from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from . import kandinsky_api
import base64
import random

def index(request):
    # return HttpResponse('<h4>12</h4>')
    return render(request, 'Index.html')


def kandinsky_view(request):
    api = kandinsky_api.Text2ImageAPI('https://api-key.fusionbrain.ai/',
                                      '42C68103FF26F3BA248051567A147874',
                                      '7BCDD2F342EDFE95409DF45037718FC9')
    model_id = api.get_model()

    answer = random.choice(list(kandinsky_api.generated_image))
    original_answer = answer
    answer = f"сцена из фильма {answer}"
    print(f"Загаданный фильм: {answer}")
    uuid = api.generate(answer, model_id)
    images = api.check_generation(uuid)
    print(f"Верный ответ: {original_answer}")
    if images:
        image_base64 = images[0]
        image_data = base64.b64decode(image_base64)

        # Создаем JSON-ответ
        response = JsonResponse({
            'image_base64': image_base64,
            'answer': original_answer
        })
        return response

    else:
        return HttpResponse('Ошибка генерации изображения', status=500)
