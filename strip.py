# File_object = open(r"adj.txt","r")
# f1 = File_object.readlines()
# thing = "["
# for x in f1:
#     thing += "{ label: \"" + x.replace("\n", "") +  "\" },\n"
# thing += "]"
# print(thing)
# File_object.close()


import nltk
from nltk.corpus import wordnet as wn

# from sklearn.manifold import spectral_embedding
# import pandas as pd
import re
import numpy as np
import json
# from nltk.corpus import wordnet
from scipy import stats
import nltk
from emb_map_script import get_syn, df
# import os

# dir_path = os.path.dirname(os.path.realpath(__file__))
# nltk.data.path.append(dir_path)

traits=set()

for x in df["Traits"]:
    for word in x.split(","):
        word = word.strip()
        if " " in word:
            word = word[word.index(' ') + 1:]
        syns = list(get_syn(word))
        for temp in syns:
            traits.add(temp.lower())
            traits.add(word.lower())

thing = "["
for synset in traits:
#    thing += "{ label: \"" + str(synset) +  "\" },\n"
     thing += "\""+str(synset) + "\",\n"

thing += "]"
print(thing)
