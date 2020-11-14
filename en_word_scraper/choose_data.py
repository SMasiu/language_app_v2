import json
import os


def load_data():
    with open('translated_data.json', 'r') as file:
        return json.loads(file.read())


def save_date(data):
    with open('chosen_data.json', 'w') as file:
        file.write(data)


def main():
    raw_data = load_data()
    end_data = []
    confirm = 'e'
    reject = 'w'

    os.system('clear')

    for data_header, data_translations in raw_data:
        end_item = [data_header, []]
        for translation in data_translations:
            print(f"\n\n\tEN word: {data_header}")
            print(f"\n\tPL word: {translation}\n\n")

            action = input(f"Reject({reject.upper()}) / Accept({confirm.upper()}): ")

            if action.lower() == confirm:
                end_item[1].append(translation)

            os.system('clear')

        end_data.append(end_item)

    save_date(json.dumps(end_data, ensure_ascii=False))


main()
