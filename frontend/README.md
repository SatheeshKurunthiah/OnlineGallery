# Pre-Requisites

* Grunt
* Grunt-cli
* Bower

# Download dependencies 

Open cmd prompt and navigate to 'OnlineGallery\frontend' folder

Type `npm install`
Type `bower install`

This will download all the dependencies you needed to run the application.

# Edit Port Bindings

Open the file `frontend\app\scripts\app.config.js`
Edit `API_URL` variable to give a port number (Eg: If server is running in port 3000 then set this variable to `http://localhost:3000/`)

# Run Application

Open cmd prompt and navigate to `Online Portal\frontend` folder

Type `grunt serve -force`