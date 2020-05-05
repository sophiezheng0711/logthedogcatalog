from flask import Flask, request
from flask_cors import CORS, cross_origin
import json
from emb_map_script import get_syn, df, get_sim, min_height, max_height, max_weight, min_weight, heights, weights
from sklearn.manifold import spectral_embedding
import pandas as pd
import re
import numpy as np
import json

app = Flask(__name__, static_url_path='', static_folder='front/build')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

with open('breedB.txt') as json_file:
    data = json.load(json_file)


@app.route('/')
def root():
    return app.send_static_file('index.html')


def computeRank(x, c_breed, c_height, c_weight, c_pop, c_personality=0):
    y = json.loads(x)
    denom = float(c_breed) + float(c_height) + float(c_weight) + float(c_pop) + float(c_personality)
    # if all parameters are set to 0, they are automatically set to default, which is c_breed=10, everything else 0
    if denom == 0:
        c_breed = 10
        denom = 10
    return float(c_breed)*y['sim']/denom + float(c_pop)*y['pop']/denom + float(c_height)*y['height']/denom + float(c_weight)*y['weight']/denom + float(c_personality)*y['personality']/denom



@app.route('/api/search', methods=['GET'])
@cross_origin()
def ir():
    name = request.args.get('name')
    name = re.sub(' ', '-', name.lower().strip())

    c_breed = request.args.get('breed')
    c_height = request.args.get('height')
    c_weight = request.args.get('weight')
    c_pop = request.args.get('pop')
    c_personality = request.args.get('personality')

    try:
        breed = data[name][0]
    except KeyError:
        return json.dumps([]), 200
    to_be_sorted = data[name][1:]
    to_be_sorted = [re.sub("'", "\"", str(x)) for x in to_be_sorted]
    to_be_sorted.sort(key=(lambda x: computeRank(
        x, c_breed, c_height, c_weight, c_pop, c_personality)), reverse=True)
    return json.dumps([breed] + to_be_sorted[:6]), 200

    ################################################################

@app.route('/api/personalityQuiz', methods=['GET'])
@cross_origin()
def personalityQuiz():

    # [plist] should be a string of adjectives separated by ', '
    plist = request.args.get('plist')
    if len(plist) == 0:
        return json.dumps([]), 200
    # make a "fake" dog with the custom traits
    name = 'custom'

    # make the collection of traits corresponding to each breed from data
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
    # make a copy of the collection so that it is disgarded right after this call
    # is terminated
    trait_dic_p = trait_dic

    # [i] is the index of the "fake" dog since we appended it in the end
    i = len(trait_dic_p)
    # add this "dog" to the collection of traits corresponding to each breed
    for word in plist.split(","):
        word = word.strip()
        if " " in word:
            word = word[word.index(' ') + 1:]
        syns = list(get_syn(word))
        
        if i in trait_dic_p:
            trait_dic_p[i] += syns
        else:
            trait_dic_p[i] = syns

    names = list(df["Name"])
    abouts = list(df['about'])
    heights_raw = list(df['Height'])
    weights_raw = list(df['Weight'])
    traits_raw = list(df['Traits'])

    # add "fake" dog to the collection of names
    breeds = [re.sub(' ', '-', namez.lower().strip()) for namez in names]
    breeds += ([name])

    # make inverse mapping from names to indices
    names_to_inds = {}
    for j in range(len(breeds)):
        names_to_inds[breeds[j]] = j

    # perform spectral embedding on collection with "fake" dog
    matrix = np.zeros([len(breeds), len(breeds)])
    for j, x in enumerate(breeds):
        matrix[j] += get_sim(breeds, trait_dic_p, breeds[j])
    embedding = spectral_embedding(matrix)
    pnt = embedding[i]
    
    vals = []

    # reverse the scores
    for x in embedding:
        vals += [np.linalg.norm(pnt - x)]
    inds = np.argsort(vals)
    to_return = {}
    for x in inds:
        to_return[re.sub(" ","-",breeds[x])] = 1 - vals[x]
    
    ans = []

    for key in to_return:
        if key != name:
            about = abouts[names_to_inds[key]]
            ans += [{'name': key, 'val': to_return[key], 'about': about, 
            'traits': df['Traits'][names_to_inds[key]],
            "shorts": json.dumps({"height": heights_raw[names_to_inds[key]], "weight": weights_raw[names_to_inds[key]], "traits": traits_raw[names_to_inds[key]]})}]
    return json.dumps(ans[:6]), 200

if __name__ == '__main__':
    app.run()
