import json
import time
import requests
import base64
import random

generated_image = {'лягушка', 'джонни деп'}
random_choice = random.choice(list(generated_image))

negativePrompt_image = {'красивый', 'темно, камни'}
random_choice_negativePrompt = random.choice(list(negativePrompt_image))

class Text2ImageAPI:
    def __init__(self, url, api_key, secret_key):
        self.URL = url
        self.AUTH_HEADERS = {
            'X-Key': f'Key {api_key}',
            'X-Secret': f'Secret {secret_key}',
        }

    def get_model(self):
        response = requests.get(self.URL + 'key/api/v1/models', headers=self.AUTH_HEADERS)
        data = response.json()
        return data[0]['id']

    def generate(self, prompt, model, images=1, width=1024, height=1024, style=3):
        styles = ['KANDINSKY', 'UHD', 'ANIME', 'DEFAULT']
        params = {
            "type": "GENERATE",
            "numImages": images,
            "width": width,
            "height": height,
            "style": styles[style],
            "negativePromptUnclip": random_choice_negativePrompt, #что в генерации не должно использоваться
            "generateParams": {
                "query": f"{prompt}"
            }
        }

        data = {
            'model_id': (None, model),
            'params': (None, json.dumps(params), 'application/json')
        }
        response = requests.post(self.URL + 'key/api/v1/text2image/run', headers=self.AUTH_HEADERS, files=data)
        data = response.json()
        return data['uuid']

    def check_generation(self, request_id, attempts=10, delay=10):
        while attempts > 0:
            response = requests.get(self.URL + 'key/api/v1/text2image/status/' + request_id, headers=self.AUTH_HEADERS)
            data = response.json()
            if data['status'] == 'DONE':
                return data['images']

            attempts -= 1
            time.sleep(delay)


if __name__ == '__main__':
    api = Text2ImageAPI('https://api-key.fusionbrain.ai/', '42C68103FF26F3BA248051567A147874',
                        '7BCDD2F342EDFE95409DF45037718FC9')
    model_id = api.get_model()
    print(random_choice)
    print(random_choice_negativePrompt)
    uuid = api.generate(random_choice, model_id, style=2)
    images = api.check_generation(uuid)
    print(images)
    image_base64 = images[0]
    image_data = base64.b64decode(image_base64)
    with open("image.jpg", "wb") as file:
        file.write(image_data)
