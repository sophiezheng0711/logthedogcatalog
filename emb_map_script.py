from sklearn.manifold import spectral_embedding
import pandas as pd
import re
import numpy as np
import json
from nltk.corpus import wordnet
from scipy import stats
import nltk
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
nltk.data.path.append(dir_path)

df = pd.read_excel("data.xlsx")

heights = df['avgHeight']
max_height = np.amax(heights)
min_height = np.amin(heights)

weights = df['avgWeight']
max_weight = np.amax(weights)
min_weight = np.amin(weights)

data = {}


def get_syn(word):
    synonyms = []
    for syn in wordnet.synsets(word):
        for l in syn.lemmas():
            synonyms.append(l.name())

    return set(synonyms)


def get_sim(breeds, trait_dic, breed):
    ind = breeds.index(breed)
    ranks = np.zeros(len(breeds))
    for i in range(len(breeds)):
        ranks[i] = len(set(trait_dic[ind]).intersection(set(trait_dic[i])))
    return ranks


def ir(breed):
    name = breed
    name = re.sub(' ', '-', name.lower().strip())

    names = list(df["Name"])
    names = [re.sub(' ', '-', namez.lower().strip()) for namez in names]

    pops = list(df["Popularity"])
    sim = df["Similar breeds"]
    abouts = list(df['about'])
    heights_raw = list(df['Height'])
    weights_raw = list(df['Weight'])
    traits_raw = list(df['Traits'])

    sims = []
    for string in sim:
        arr = string.split(",")
        for ind in range(len(arr)):
            arr[ind] = re.sub('[^a-zA-Z-]+', '', arr[ind])
        sims += arr

    trait_dic = {}
    for i, x in enumerate(df["Traits"]):
        for word in x.split(","):
            word = word.strip()
            if " " in word:
                word = word[word.index(' ') + 1:]
            syns = list(get_syn(word))

            if i in trait_dic:
                trait_dic[i] += syns
            else:
                trait_dic[i] = syns

    adj_mat = np.zeros([len(names), len(names)])
    for x in range(len(names)):
        namez = names[x]
        for y in range(len(sim)):
            if namez in sim[y].lower():
                adj_mat[x, y] += 1
    adj_mat = adj_mat + adj_mat.T
    embedding = spectral_embedding(adj_mat)

    matrix = np.zeros([len(names), len(names)])
    for i, x in enumerate(names):
        matrix[i] += get_sim(names, trait_dic, names[i])
    embedding_c = spectral_embedding(matrix)

    try:
        pnt = embedding[names.index(name)]
        pnt_c = embedding_c[names.index(name)]
    except ValueError:
        print('ERROR ERROR ERROR PNT NOT ASSIGNED', name)

    vals = []
    for x in embedding:
        vals += [np.linalg.norm(pnt - x)]
    inds = np.argsort(vals)
    to_return_v = {}
    for i, x in enumerate(inds):
        to_return_v[names[x]] = 1 - i / len(inds)

    vals_c = []
    for x in embedding_c:
        vals_c += [np.linalg.norm(pnt_c - x)]
    inds_c = np.argsort(vals_c)
    to_return_t = {}
    for i, x in enumerate(inds_c):
        to_return_t[names[x]] =  1 - i / len(inds_c) #1 - vals_c[x]

    # for range calculations
    queryHeight = float(heights[inds[0]])
    queryWeight = float(weights[inds[0]])

    to_return = []
    for x in inds_c:
        # heightSim = rangeSim(queryMinHeight, queryMaxHeight, minHeights[x], maxHeights[x])
        heightSim = 1 - abs((queryHeight - heights[x])/(
            max(abs(queryHeight - max_height), abs(queryHeight - min_height))))
        heightSim = min(max(heightSim, 0), 1)

        weightSim = 1 - abs((queryWeight - weights[x])/(
            max(abs(queryWeight - max_weight), abs(queryWeight - min_weight))))
        weightSim = min(max(weightSim, 0), 1)
        
        
        to_return += [json.dumps({"name": names[x], "sim": to_return_v[names[x]], ##1-vals[x],
                                  "pop": pops[x], "about": abouts[x], "height": heightSim, 
                                  "weight": weightSim, "personality": to_return_t[names[x]],
                                  "shorts": json.dumps({"height": heights_raw[x], "weight": weights_raw[x], "traits": traits_raw[x]})})]

    # Write results to the static JSON file
    data[name] = to_return


# For all breeds, generate the embedding mapping
if __name__ == "__main__":
    names = list(df['Name'])
    for idx in range(len(names)):
        print(idx, '/', len(names)-1, ':', names[idx])
        ir(names[idx])

    with open('breedB.txt', 'w') as outfile:
        json.dump(data, outfile, sort_keys=True, indent=4)
