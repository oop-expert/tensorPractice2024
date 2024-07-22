from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from . import kandinsky_api
import base64
import random
import time
import threading

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

# Список для хранения сгенерированных изображений и ответов
generated_data = []

# Флаг, показывающий, что генерация изображений запущена
generating = False

# Количество изображений, которое нужно сгенерировать
NUM_IMAGES = 10


def index(request):
    global generated_data, generating
    generated_data = []
    generating = True

    # Запускаем генерацию изображений в нескольких потоках
    threads = []
    for i in range(NUM_IMAGES):
        threads.append(threading.Thread(target=generate_image, args=(i,)))
        threads[-1].start()

    return render(request, 'Index.html')


def generate_images(questions):
    # Запускаем генерацию изображений в нескольких потоках
    threads = []
    for question in questions:
        threads.append(threading.Thread(target=generate_image, args=(question,)))
        threads[-1].start()


def generate_image(question):
    global generated_data
    api_key = random.choice(api_keys)

    # Проверяем доступность ключа
    while True:
        if api_key['url'] not in last_requests or time.time() - last_requests[api_key['url']] >= 10:
            break
        else:
            print(f"API ключ {api_key['url']} недоступен, переходим к следующему")
            time.sleep(1)  # Пауза, чтобы не перегружать API

    api = kandinsky_api.Text2ImageAPI(api_key['url'], api_key['key1'], api_key['key2'])
    model_id = api.get_model()
    # answer = random.choice(list(kandinsky_api.generated_image))
    original_answer = question.answer.lower()
    answer = f"сцена из фильма {original_answer}"
    print(f"Загаданный фильм: {answer}")

    uuid = api.generate(answer, model_id)
    last_requests[api_key['url']] = time.time()
    images = api.check_generation(uuid)
    print(f"Верный ответ: {original_answer}")

    if images:
        image_base64 = images[0]
        question.image = image_base64
        question.save()
        generated_data.append({'image_base64': image_base64, 'answer': original_answer})
    else:
        print('Ошибка генерации изображения')


def kandinsky_view(request):
    global generated_data, generating

    # Если генерация завершена, отправляем сообщение об окончании игры
    if not generating and not generated_data:
        return HttpResponse('Игра завершена', status=200)

    # Если есть сгенерированные изображения, отправляем следующее
    if generated_data:
        # Извлекаем данные для следующего изображения
        image_data = generated_data.pop(0)
        return JsonResponse(image_data)

    # Если генерация еще не завершена, возвращаем статус waiting
    return JsonResponse({'status': 'waiting'})
