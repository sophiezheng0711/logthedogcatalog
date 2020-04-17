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


if __name__ == '__main__':
    # app.run(debug=True, host='0.0.0.0')
    app.run()