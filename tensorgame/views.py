from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from . import kandinsky_api
import base64
import random
import time

# Список API ключей (добавьте свои ключи)
api_keys = [
    {'url': 'https://api-key.fusionbrain.ai/', 'key1': '42C68103FF26F3BA248051567A147874',
     'key2': '7BCDD2F342EDFE95409DF45037718FC9'},
    {'url': 'https://api-key.fusionbrain.ai/', 'key1': 'FA4459AE133553D4C02FA0651BDD71A0',
     'key2': 'B59A05A0218C4C391AEFCD66402429AB'},
    {'url': 'https://api-key.fusionbrain.ai/', 'key1': 'D59F46AB2D4A7C5672146EC5C7C417AE',
     'key2': '23E03DCB1F5A42C2A3C68B17B1638745'},
    {'url': 'https://api-key.fusionbrain.ai/', 'key1': '2B55933B05A00946A1E4A8B0E7976101',
     'key2': '62C3B424ECCE3ED205BE98AA82BD058B'},
    {'url': 'https://api-key.fusionbrain.ai/', 'key1': 'A7C01147EC433CDDE8D6B9A51230C526',
     'key2': '719F0726D77DD7F3385B304C782F1E5E'},
    {'url': 'https://api-key.fusionbrain.ai/', 'key1': '54EAAEA432B927D1BED5AC6C478C99E4',
     'key2': 'D0462C08A9B6B9B795AF2EDFF418D63A'},
    {'url': 'https://api-key.fusionbrain.ai/', 'key1': '3712A8721A2F5A2F1804C1977120876F',
     'key2': 'EE590C04250181DE881E92639FA7CBDE'},
    {'url': 'https://api-key.fusionbrain.ai/', 'key1': 'B97904418DF683E9FABD1C2B0A06740C',
     'key2': '41DC52CA0DD037B589BBECBF7FB42779'},
    {'url': 'https://api-key.fusionbrain.ai/', 'key1': 'DA5772B114788AF1D1422D8359E93CCD',
     'key2': 'C41142D4DBAEE45BC6A2F8010D561A35'},
    {'url': 'https://api-key.fusionbrain.ai/', 'key1': 'DD6330B33BF4EA3EE19DEF45FB96C772',
     'key2': '024BF8D3008CF726E31DA588D28B8178'},
]

# Словарь для отслеживания последних запросов для каждого API ключа
last_requests = {}


def index(request):
    return render(request, 'Index.html')


def kandinsky_view(request):
    # Выбираем случайный API ключ
    api_key = random.choice(api_keys)

    # Проверяем, не был ли отправлен запрос на этот ключ недавно
    if api_key['url'] in last_requests and time.time() - last_requests[
        api_key['url']] < 10:  # Ограничение на 1 запрос в 10 секунд
        print(f"API ключ {api_key['url']} недоступен, используем другой")
        return kandinsky_view(request)  # Рекурсивно выбираем другой ключ

    api = kandinsky_api.Text2ImageAPI(api_key['url'], api_key['key1'], api_key['key2'])
    model_id = api.get_model()

    answer = random.choice(list(kandinsky_api.generated_image))
    original_answer = answer
    answer = f"сцена из фильма {answer}"
    print(f"Загаданный фильм: {answer}")
    uuid = api.generate(answer, model_id)

    # Запоминаем время последнего запроса
    last_requests[api_key['url']] = time.time()

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
