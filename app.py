from flask import Flask, request
from flask_cors import CORS, cross_origin
from sklearn.manifold import spectral_embedding
import pandas as pd
import re
import numpy as np
import json
from scipy import stats

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


def computeRank(x, c_breed, c_height, c_weight, c_pop):
    y = json.loads(x)
    return float(c_breed)*y['sim'] + float(c_pop)*y['pop'] + float(c_height)*y['height'] + float(c_weight)*y['weight']


@app.route('/api/search', methods=['GET'])
@cross_origin()
def ir():
    name = request.args.get('name')
    name = re.sub(' ', '-', name.lower().strip())

    c_breed = request.args.get('breed')
    c_height = request.args.get('height')
    c_weight = request.args.get('weight')
    c_pop = request.args.get('pop')
    version = request.args.get('ver')

    # Prototype 2 is set to default, so if version is not specified, defaults to Prototype 2.
    # TODO Prototype 2 has not been implemented yet
    if version != "1":
        
        
   
        # bad code alert
        
        import nltk
        nltk.download('wordnet')
        from nltk.corpus import wordnet
        
        def get_syn(word):
            synonyms = []
            for syn in wordnet.synsets(word):
                for l in syn.lemmas():
                    synonyms.append(l.name())
            
            return set(synonyms)
        
        df = pd.read_excel("data.xlsx") # CHANGE TO data.xlsx
        names = list(df["Name"])
        breeds = [str(name).lower().strip() for name in names]
        sim = df["Similar breeds"]
        
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
                    
        import numpy as np

        def get_sim(breed):
            ind = breeds.index(breed)
            ranks = np.zeros(len(breeds))
            for i in range(len(breeds)):
                ranks[i] = len(set(trait_dic[ind]).intersection(set(trait_dic[i])))

            return ranks
        
        matrix = np.zeros([len(breeds), len(breeds)])
        for i, x in enumerate(breeds):
            matrix[i] += get_sim(breeds[i])
            
        from sklearn.manifold import spectral_embedding
        embedding = spectral_embedding(matrix)
        
        
        pnt = embedding[breeds.index(name.lower())]
        vals = []
        for x in embedding:
            vals += [np.linalg.norm(pnt - x)]
        inds = np.argsort(vals)
        to_return = {}
        for x in inds:
            to_return[re.sub(" ","-",breeds[x])] = 1 - vals[x]
            
        
        # bad code alert end


        
        
        
        
        with open('breedB.txt') as json_file:
            data = json.load(json_file)
        breed = data[name][0]
        to_be_sorted = data[name][1:]
        
        
        
        # bad code alert
        to_be_sorted2 = []
        for x in to_be_sorted:
            dic = json.loads(x)
            dic["personality"] = to_return[dic["name"]]
            
            to_be_sorted2 += [dic]
            

            
        to_be_sorted2 = [re.sub("'","\"",str(x)) for x in to_be_sorted2]

        
        # bad code alert end
            
        to_be_sorted2.sort(key=(lambda x: computeRank(
            x, c_breed, c_height, c_weight, c_pop)), reverse=True)
        return json.dumps([breed] + to_be_sorted2[:9]), 200

    ################################################################
    # Version 1 Legacy Code DO NOT TOUCH
    ################################################################
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
                adj_mat[x, y] += 1

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
        heightSim = 1 - abs((queryHeight - heights[x])/(
            max(abs(queryHeight - max_height), abs(queryHeight - min_height))))
        heightSim = min(max(heightSim, 0), 1)
        weightSim = 1 - abs((queryWeight - weights[x])/(
            max(abs(queryWeight - max_weight), abs(queryWeight - min_weight))))
        weightSim = min(max(weightSim, 0), 1)
        to_return += [json.dumps({"name": names[x], "sim": 1-vals[x], "pop": pops[x],
                                  "about": abouts[x], "height": heightSim, "weight": weightSim})]

    to_be_sorted = to_return[1:]
    to_be_sorted.sort(key=(lambda x: computeRank(
        x, c_breed, c_height, c_weight, c_pop)), reverse=True)
    return json.dumps([to_return[0]] + to_be_sorted[:9]), 200

    ################################################################


if __name__ == '__main__':
    # app.run(debug=True, host='0.0.0.0')
    app.run()
