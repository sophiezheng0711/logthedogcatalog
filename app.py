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
heights = df['avgHeight']
max_height = np.amax(heights)
min_height = np.amin(heights)
weights = df['avgWeight']
max_weight = np.amax(weights)
min_weight = np.amin(weights)

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/api/hello')
@cross_origin()
def hello_world():
    return 'UFO signal connected -_-'

def computeRank(x, c_breed, c_height, c_weight, c_pop):
    y = json.loads(x)
    return float(c_breed)*y['sim'] + float(c_pop)*y['pop'] + float(c_height)*y['height'] + float(c_weight)*y['weight']

@app.route('/api/search', methods=['GET'])
@cross_origin()
def ir():
    name = request.args.get('name')
    c_breed = request.args.get('breed')
    c_height = request.args.get('height')
    c_weight = request.args.get('weight')
    c_pop = request.args.get('pop')
    name = re.sub(' ', '-', name).lower()
    names = list(df["Name"])
    names = [namez.lower().strip() for namez in names]
    pops = list(df["Popularity"])
    sim = df["Similar breeds"]
    abouts = list(df['About'])
    
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
    queryHeight = float(heights[inds[0]])
    queryWeight = float(weights[inds[0]])

    to_return = []
    for x in inds:
        # heightSim = rangeSim(queryMinHeight, queryMaxHeight, minHeights[x], maxHeights[x])
        heightSim = 1 - abs((queryHeight - heights[x])/(max(abs(queryHeight - max_height), abs(queryHeight - min_height))))
        heightSim = min(max(heightSim, 0), 1)
        weightSim = 1 - abs((queryWeight - weights[x])/(max(abs(queryWeight - max_weight), abs(queryWeight - min_weight))))
        weightSim = min(max(weightSim, 0), 1)
        to_return += [json.dumps({"name": names[x], "sim": 1-vals[x], "pop": pops[x], "about": abouts[x], "height" : heightSim, "weight" : weightSim})]

    to_be_sorted = to_return[1:]    
    to_be_sorted.sort(key=(lambda x: computeRank(x, c_breed, c_height, c_weight, c_pop)), reverse=True)
    return json.dumps([to_return[0]] + to_be_sorted[:9]), 200




####


if __name__ == '__main__':
    # app.run(debug=True, host='0.0.0.0')
    app.run()