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
    return float(c_breed)*y['sim'] + float(c_pop)*y['pop'] + float(c_height)*y['height'] + float(c_weight)*y['weight'] + float(c_personality)*y['personality']



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

    # Prototype 2 is set to default, so if version is not specified, defaults to Prototype 2.

    breed = data[name][0]
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
    name = 'custom'


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

    trait_dic_p = trait_dic

    i = len(trait_dic_p)
    for word in plist.split(","):
        word = word.strip()
        if " " in word:
            word = word[word.index(' ') + 1:]
        syns = list(get_syn(word))
        
        if i in trait_dic_p:
            trait_dic_p[i] += syns
        else:
            trait_dic_p[i] = syns
    
    # print(trait_dic_p[i])

    names = list(df["Name"])
    abouts = list(df['about'])

    breeds = [re.sub(' ', '-', namez.lower().strip()) for namez in names]
    breeds += ([name])

    names_to_inds = {}
    for j in range(len(breeds)):
        names_to_inds[breeds[j]] = j

    matrix = np.zeros([len(breeds), len(breeds)])
    for j, x in enumerate(breeds):
        matrix[j] += get_sim(breeds, trait_dic_p, breeds[j])
    # embedding = np.zeros([len(breeds), len(breeds)])
    embedding = spectral_embedding(matrix)
    # print(embedding.shape)
    pnt = embedding[i]
    
    vals = []

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
            ans += [{'name': key, 'val': to_return[key], 'about': about, 'traits': df['Traits'][names_to_inds[key]]}]
    return json.dumps(ans[:6]), 200

if __name__ == '__main__':
    # app.run(debug=True, host='0.0.0.0')
    app.run()
