import praw
import pandas as pd
import numpy as np
from scipy import stats

reddit = praw.Reddit(client_id = '8yE9T9IWth1Bdg', 
                    client_secret = 'a3ImXQDMA27xnOCNxCIqZgR27ho',
                    username = 'LogTheAnalogDog', 
                    password = 'password', 
                    user_agent = 'Corgi')

reddAll = reddit.subreddit('all')
df = pd.read_excel('data.xlsx')
dogs = list(df['Name'])

def getUpvote(breed):
    """
    Gets the average upvotes of the top 10 posts for a dog breed
    """
    avg = 0
    search = reddAll.search(breed, sort='top', limit=10)
    for post in search:
        avg += post.score
    return(avg / search.limit)

popularity = []

for breed in dogs:
    popularity.append(getUpvote(breed))    

percentiles = [stats.percentileofscore(popularity, pop, 'rank') for pop in popularity]
percentiles = np.array(percentiles) / 100

df['Popularity'] = percentiles

df.to_excel('data.xlsx')