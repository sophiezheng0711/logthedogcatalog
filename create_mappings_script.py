from sklearn.manifold import spectral_embedding
import pandas as pd
import re
import numpy as np
import json

df = pd.read_excel("data.xlsx")

heights = df['avgHeight']
max_height = np.amax(heights)
min_height = np.amin(heights)

weights = df['avgWeight']
max_weight = np.amax(weights)
min_weight = np.amin(weights)

data = {}


def computeRank(x, c_breed, c_height, c_weight, c_pop):
    y = json.loads(x)
    return float(c_breed)*y['sim'] + float(c_pop)*y['pop'] + float(c_height)*y['height'] + float(c_weight)*y['weight']


def ir(breed):
    name = breed
    name = re.sub(' ', '-', name.lower().strip())

    names = list(df["Name"])
    names = [re.sub(' ', '-', namez.lower().strip()) for namez in names]

    pops = list(df["Popularity"])
    sim = df["Similar breeds"]
    abouts = list(df['About'])

    sims = []
    for string in sim:
        arr = string.split(",")
        for ind in range(len(arr)):
            arr[ind] = re.sub('[^a-zA-Z-]+', '', arr[ind])
        sims += arr

    adj_mat = np.zeros([len(names), len(names)])
    for x in range(len(names)):
        namez = names[x]
        for y in range(len(sim)):
            if namez in sim[y].lower():
                adj_mat[x, y] += 1
    adj_mat = adj_mat + adj_mat.T
    embedding = spectral_embedding(adj_mat)

    try:
        pnt = embedding[names.index(name.lower())]
    except ValueError:
        print('ERROR ERROR ERROR PNT NOT ASSIGNED', name)

    vals = []
    for x in embedding:
        vals += [np.linalg.norm(pnt - x)]
    inds = np.argsort(vals)

    # for range calculations
    queryHeight = float(heights[inds[0]])
    queryWeight = float(weights[inds[0]])

    to_return = []
    for x in inds:
        # heightSim = rangeSim(queryMinHeight, queryMaxHeight, minHeights[x], maxHeights[x])
        heightSim = 1 - abs((queryHeight - heights[x])/(
            max(abs(queryHeight - max_height), abs(queryHeight - min_height))))
        heightSim = min(max(heightSim, 0), 1)

        weightSim = 1 - abs((queryWeight - weights[x])/(
            max(abs(queryWeight - max_weight), abs(queryWeight - min_weight))))
        weightSim = min(max(weightSim, 0), 1)

        to_return += [json.dumps({"name": names[x], "sim": 1-vals[x],
                                  "pop": pops[x], "about": abouts[x], "height": heightSim, "weight": weightSim})]

    # Write results to the static JSON file
    data[name] = to_return


# For all breeds, generate the embedding mapping
names = list(df['Name'])
for idx in range(len(names)):
    print(idx, '/', len(names)-1, ':', names[idx])
    ir(names[idx])

with open('breedB.txt', 'w') as outfile:
    json.dump(data, outfile, sort_keys=True, indent=4)
