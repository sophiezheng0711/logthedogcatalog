# Logthedogcatalog

# Architecture

Logtheanalogdog is a full stack application constructed by a React frontend and a Python Flask backend. General breakdown is shown as follows:
```
+-- logtheanalogdog # Root directory
|   +-- front # React frontend
|   +-- app.py # Flask backend
|   +-- requirements.txt
```
# Pulling Updates

A brief guide on installing dependencies.

## Frontend
```
$ cd front
$ npm install
```

## Backend
```
$ pip install -r requirements.txt
```

# Updating and Deploying to Production

## Frontend Updating

### Updating Build

If you are working on the `frontend`, after updating the app, run the following commands to update the build (*note that sometimes you would have to remove `front/build` and then start the following*):
```
# assuming you are in the root directory
$ cd front
$ npm run build
```
This should update `front/build/index.html`, which is the file that our Flask backend serves.

### Testing Build Directory (Optional)

To test if the update is working as intended, first check the build directory of the server:
```
$ cd front/build
$ python3 -m http.server
```
Then open your browser at address `http://localhost:8000` to see if the update has been implemented. Note that you can skip this step at your own discretion.

## General Updating

### Testing App Update
Return to the root directory, and run
```
$ gunicorn app:app
```
Once the server is up and running, open your browser at address `http://localhost:8000` to see if the update has been implemented.

## Deploying Update to Heroku
Once you have tested your update, it's time to deploy! Make sure you have pushed all changes to our git repository. Then, push again to the Heroku git repository. An example would be:
```
$ git add .
$ git commit -m "update"
$ git push
$ git push heroku master
```
Then, your update should be live at `https://logtheanalogdogtest.herokuapp.com/`. Note that your browser caches sometimes, so if you do not see your update, try opening the webpage on incognito.

