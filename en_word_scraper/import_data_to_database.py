from python_graphql_client import GraphqlClient
import json

# ------------ CONFIG -------------

groups = [1]

# --------- END OF CONFIG ---------

client = GraphqlClient(endpoint="http://localhost:8080/graphql")


def load_translated_words():
    with open('translated_data.json') as file:
        return json.loads(file.read())


def save_word(word, lang):
    query = """
        mutation addWord($word: WordInput!, $lang: String!) {
            addWord(word: $word, lang: $lang) {
                id
                word
            }
        }
    """
    variables = {"word": {"word": word, 'groups': groups}, 'lang': lang}
    return client.execute(query=query, variables=variables)


def save_translation(from_word, to_word):
    query = """
        mutation addTranslation(
            $from: TranslationWordInput!
            $to: TranslationWordInput!
        ) {
            addTranslation(from: $from, to: $to) {
                id
            }
        }
    """
    variables = {"from": from_word, "to": to_word}
    return client.execute(query=query, variables=variables)


def import_date_to_database():
    words = load_translated_words()

    for word, translations in words:
        word_en_id = save_word(word, 'en')['data']['addWord']['id']

        for translation in translations:
            word_pl_id = save_word(translation, 'pl')['data']['addWord']['id']

            save_translation({'wordId': word_en_id, 'lang': 'en'}, {'wordId': word_pl_id, 'lang': 'pl'})


import_date_to_database()
