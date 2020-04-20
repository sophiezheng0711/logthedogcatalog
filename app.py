from flask import Flask, request
from flask_cors import CORS, cross_origin
from sklearn.manifold import spectral_embedding
import pandas as pd
import re
import numpy as np
import json

app = Flask(__name__, static_url_path='', static_folder='front/build')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
df = pd.read_excel("data.xlsx")

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/api/hello')
@cross_origin()
def hello_world():
    return 'UFO signal connected -_-'

def rangeSim(min1, max1, min2, max2):
    """
    helper for range calculations
    """
    overlap = min(max1, max2) - max(min1, min2)
    overlap = 0 if overlap < 0 else overlap
    total = max(max1, max2) - min(min1, min2)
    if total == 0:
        return 1
    else:
        return overlap / total

def computeRank(x):
    y = json.loads(x)
    return y['sim'] + y['pop'] + y['height'] + y['weight']

@app.route('/api/search', methods=['GET'])
@cross_origin()
def ir():
    name = request.args.get('name')
    name = re.sub(' ', '-', name).lower()
    names = list(df["Name"])
    names = [namez.lower().strip() for namez in names]
    pops = list(df["Popularity"])
    sim = df["Similar breeds"]
    abouts = list(df['About'])
    minHeights = list(df['minHeight'])
    maxHeights = list(df['maxHeight'])
    minWeights = list(df['minWeight'])
    maxWeights = list(df['maxWeight'])
    
    for ind in range(len(names)):
        namez = names[ind]
        namez = namez.lower().strip()
        namez = re.sub(' ', '-', namez)
        names[ind] = namez

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
                adj_mat[x,y] += 1

    adj_mat = adj_mat + adj_mat.T
    embedding = spectral_embedding(adj_mat)
    try:
        pnt = embedding[names.index(name.lower())]
    except ValueError:
        return json.dumps([]), 200
    vals = []
    for x in embedding:
        vals += [np.linalg.norm(pnt - x)]
    inds = np.argsort(vals)

    # for range calculations
    queryMinHeight = float(minHeights[inds[0]])
    queryMaxHeight = float(maxHeights[inds[0]])
    queryMinWeight = float(minWeights[inds[0]])
    queryMaxWeight = float(maxWeights[inds[0]])

    to_return = []
    for x in inds:
        heightSim = rangeSim(queryMinHeight, queryMaxHeight, minHeights[x], maxHeights[x])
        weightSim = rangeSim(queryMinWeight, queryMaxWeight, minWeights[x], maxWeights[x])
        to_return += [json.dumps({"name": names[x], "sim": 1-vals[x], "pop": pops[x], "about": abouts[x], "height" : heightSim, "weight" : weightSim})]
        
    to_return.sort(key=(computeRank), reverse=True)
    return json.dumps(to_return[:10]), 200




####


if __name__ == '__main__':
    # app.run(debug=True, host='0.0.0.0')
    app.run()