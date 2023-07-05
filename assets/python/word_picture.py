import requests
from bs4 import BeautifulSoup
import nltk
from nltk.corpus import stopwords
from wordcloud import WordCloud
import matplotlib.pyplot as plt

# If you're running this for the first time, you'll need to download the stopwords
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))


def process_article(url):
    # Send a GET request
    response = requests.get(url)

    # Check the status of the request
    if response.status_code == 200:
        # Parse the response text with BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Get the text from all <p> tags.
        p_tags = soup.find_all('p')
        # Get the text from each tag and join them into a single string.
        article_text = ' '.join([tag.get_text() for tag in p_tags])
        
        # tokenize the text
        words = nltk.word_tokenize(article_text)
        
        # remove stopwords and non-alphabetic tokens
        words = [word.lower() for word in words if word.isalpha() and word not in stop_words]
        
        # join the list of words back into a single string
        words_string = ' '.join(words)
        
        # create and generate a word cloud image
        wordcloud = WordCloud().generate(words_string)
        
        # Display the generated image
        plt.imshow(wordcloud, interpolation='bilinear')
        plt.axis("off")
        plt.show()
    else:
        print(f"Error: unable to retrieve the article from {url}. Status code: {response.status_code}")


# Replace 'article_url' with the URL of the article you want to process
process_article('https://www.cnn.com/2023/07/02/middleeast/israel-jenin-camp-idf-raid-west-bank-intl-hnk/index.html')