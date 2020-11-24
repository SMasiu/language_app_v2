import json
from googletrans import Translator


def save_translated_data(json_data):
    with open('translated_data.json', 'w') as file:
        file.write(json_data)


def load_data_from_file():
    with open('data.json') as data_file:
        return json.loads(data_file.read())


def translate_data():
    start = 0
    end = 100
    data = load_data_from_file()

    print(len(data))

    translator = Translator()

    translations = translator.translate(data[start:end], dest='pl', src='en')
    words = []
    i = 0

    for translation in translations:
        words.append([data[i + start], []])

        if translation.extra_data['all-translations']:
            for allTranslations in translation.extra_data['all-translations']:
                for t in allTranslations[1][:3]:
                    words[i][1].append(t)
        i += 1

    save_translated_data(json.dumps(words, ensure_ascii=False))


translate_data()
