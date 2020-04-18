from flask import Flask
from flask_cors import CORS, cross_origin
app = Flask(__name__, static_url_path='', static_folder='front/build')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/api/hello')
@cross_origin()
def hello_world():
    return 'UFO signal connected -_-'




#####

from sklearn.manifold import spectral_embedding
import pandas as pd
import re
import numpy as np
import json

def ir(name):
    
    df = pd.read_excel("data.xlsx")
    names = list(df["Name"])
    names = [name.lower().strip() for name in names]
    sim = df["Similar breeds"]
    
    for ind in range(len(names)):
        namez = names[ind]
        namez = name.strip()
        namez = re.sub(' ', '-', namez)
        names[ind] = namez

    sims = []
    for string in sim:
        arr = string.split(",")
        for ind in range(len(arr)):
            arr[ind] = re.sub('[^a-zA-Z-]+', '', arr[ind])
            if arr[ind] in names:
                pass
            else:
                print(arr[ind])
        sims += arr
        
    adj_mat = np.zeros([len(names), len(names)])
    for x in range(len(names)):
        name = names[x]
        for y in range(len(sim)):
            if name in sim[y]:
                adj_mat[x,y] += 1
                
    embedding = spectral_embedding(adj_mat)
    
    pnt = embedding[names.index(name.lower())]
    vals = []
    for x in embedding:
        vals += [np.linalg.norm(pnt - x)]
    inds = np.argsort(vals)
    to_return = []
    for x in inds[:10]:
        to_return += [[names[x],1 - vals[x]]]
        
    return json.dumps(to_return)




####


if __name__ == '__main__':
    # app.run(debug=True, host='0.0.0.0')
    app.run()