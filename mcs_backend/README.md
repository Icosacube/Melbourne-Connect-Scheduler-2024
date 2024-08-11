# Environment variables 
Please create a `.env` file with the variable and path descried in [Backend ENV](https://melbourneconnectscheduler.notion.site/Environment-variables-b50021cfd9ef4d6499b610931b5d274e?pvs=4) before proceeding

# Docker deployment for Backend
### `docker-compose up`

This command will start the containers. And run the 
backend API server at `localhost:4000` 

### `docker-compose up --build`

This command will build the Docker image and start the containers. And run the 
backend API server at `localhost:4000` 

The `--build` flag tells Docker to build the Docker image from scratch for the first time running the docker, and when there is change that Docker need to port into its storage. 

# NPM Available Scripts

In the project directory, you can run:

### `npm install`
This command will install all necessary dependencies 
Please run this before running any other NPM Scripts 

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in your browser.

The page will reload when you make changes.

### `npm run start`

Launches the backend server in production mode  

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles files in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

