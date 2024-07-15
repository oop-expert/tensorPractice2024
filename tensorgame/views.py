from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from . import kandinsky_api
import base64
import random

def index(request):
    #return HttpResponse('<h4>12</h4>')
    return render(request, 'Index.html')


def kandinsky_view(request):
    if request.method == 'GET':
        api = kandinsky_api.Text2ImageAPI('https://api-key.fusionbrain.ai/',
                                           '42C68103FF26F3BA248051567A147874',
                                           '7BCDD2F342EDFE95409DF45037718FC9')
        model_id = api.get_model()

        #  Получаем загаданный фильм:
        answer = random.choice(list(kandinsky_api.generated_image))  # Используем generated_image из kandinsky_api
        print(f"Загаданное слово: {answer}")

        #  Генерируем изображение:
        uuid = api.generate(answer, model_id)
        images = api.check_generation(uuid)

        if images:
            image_base64 = images[0]
            image_data = base64.b64decode(image_base64)

            #  Создаем ответ с загаданным словом без кавычек:
            response = HttpResponse(image_data, content_type='image/jpeg')
            response['X-Answer'] = answer.strip('"')  # Удаляем кавычки
            response['X-CorrectAnswer'] = answer.strip('"')  # Удаляем кавычки

            #  Правильно отправляем ответ:
            response.write(answer)  #  Записываем  answer  в тело ответа

            return response

        else:
            return HttpResponse('Ошибка генерации изображения', status=500)

    else:
        return HttpResponse('Неверный метод запроса', status=405)