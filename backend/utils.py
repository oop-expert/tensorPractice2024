import nltk
from nltk.stem.porter import PorterStemmer
from nltk.corpus import stopwords
import spacy

nltk.download('stopwords')
nltk.download('punkt')

stop_words_ru = set(stopwords.words('russian'))
nlp = spacy.load('ru_core_news_lg')
stemmer = PorterStemmer()


def preprocess(text):
    text = text.lower()
    tokens = nltk.word_tokenize(text)
    tokens = [stemmer.stem(token) for token in tokens if token not in stop_words_ru]
    return ' '.join(tokens)


def get_similarity(text1, text2):
    preprocessed_text1 = preprocess(text1)
    preprocessed_text2 = preprocess(text2)
    doc1 = nlp(preprocessed_text1)
    doc2 = nlp(preprocessed_text2)
    return doc1.similarity(doc2)
