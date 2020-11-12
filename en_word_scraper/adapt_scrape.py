import json


# ----------------------------------------
# -------- MODIFY SINGLE ELEMENT ---------
# ----------------------------------------

def modify_scrape_element(element):
    ret = []

    def clear_field(text):
        for item in text.split(',')[0].split('-'):
            ret.append(item)

    clear_field(element['FIELD2'])
    clear_field(element['FIELD3'])
    clear_field(element['FIELD4'])
    return ret


# ----------------------------------------
# ----- END OF MODIFY SINGLE ELEMENT -----
# ----------------------------------------


def trim_whitespace(text):
    text = text.replace('\t', '').replace('\n', '').strip()
    trimmed = ''
    last_space = False
    for char in text:
        if last_space and char == ' ':
            continue

        trimmed += char
        last_space = char == ' '

    return trimmed


def load_scrape():
    with open('scrape_data.json', 'r') as scrape_file:
        return json.loads(scrape_file.read())


def save_adapted_data(json_data):
    with open('data.json', 'w') as file:
        file.write(json_data)


def adapt_scrape():
    scrape_data = load_scrape()
    adapted_data = [modify_scrape_element(elem) for elem in scrape_data]
    save_adapted_data(json.dumps([trim_whitespace(item) for sublist in adapted_data for item in sublist]))


adapt_scrape()
