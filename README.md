# Melbourne Connect Visit Scheduler

Melbourne Connect, powered by the University of Melbourne, is a collaborative digital innovation ecosystem hosting various events, including the AI@Melbourne Colloquium series. The current workflow for organising these events is manual and time-consuming, involving multiple steps and systems. The main issues include manual communication, logistical tracking via Excel, and lack of system integration. The desired solution is an all-in-one event planning system to centralise logistical information, streamline processes, and reduce the executive assistant's cognitive load. The project aims to create a user-friendly central dashboard covering aspects like guest invitations, travel arrangements, scheduling, catering, and financial management.

# Get started 

## Environment variables 
Please create `.env` files with the variable and path descried in 
- [Frontend ENV](https://melbourneconnectscheduler.notion.site/Environment-variables-0976a23502d4481f8cfb37ab251e741b?pvs=4) and, 
- [Backend ENV](https://melbourneconnectscheduler.notion.site/Environment-variables-b50021cfd9ef4d6499b610931b5d274e?pvs=4) 

before proceeding the execution to start the services

## Information on Docker Deployment

Given the Docker compose version different on machines, the command to execute the docker deployment will vary. 
- For Docker Compose version 1, use `docker-compose` (with dash between two words)
- For Docker Compose version 2, use `docker compose` (with space between two words)

All command list below will use the version 2 Docker Compose command

## Docker Deployment - Full Application 

Navigate on to the root directory of the application and run the following commands
### Build and Run

#### `docker compose up --build -d`

This command will build the docker image and start the service as docker containers. Which will start the application at [http://localhost](http://localhost)

###  Run

#### `docker compose up `

This command will start the docker containers (when Docker images was created via the Build and Run command), and run the application at [http://localhost](http://localhost)

## Individual Deployment - Frontend

Please run the following commands in `frontend/mcs-frontend` directory 

#### `npm install`
This command will install all necessary dependencies 
Please run this before running any other NPM Scripts 

#### `npm start`
Runs this commend to start the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\
(Please ensure port 3000 on host machine is available before run the command)

#### For more information please view the [Frontend README.md](frontend/mcs-frontend/README.md)

## Individual Deployment - Backend

Please run the following commands in `mcs_backend` directory

### Docker runnable
#### `docker compose up`

This command will start the containers. And run the 
backend API server in development mode at [http://localhost:4000](http://localhost:4000) \
(Please ensure port 4000 on host machine is available before run the command)


#### `docker compose up --build`

This command will build the Docker image and start the containers. And run the 
backend API server at [http://localhost:4000](http://localhost:4000) \
(Please ensure port 4000 on host machine is available before run the command)


### NPM Available Scripts

In the `mcs_backend` directory, you can run:

#### `npm install`
This command will install all necessary dependencies Please run this before running any other NPM Scripts 

#### `npm run dev`

Runs the app in the development mode. Open [http://localhost:4000](http://localhost:4000) to view it in your browser.

#### `npm run start`

Launches the backend server in production mode  

#### For more information please view the [Backend README.md](mcs_backend/README.md)


# Artefacts, Deliverable and Documentation
Please visit our Notion site: [Melbourne Connect Scheduler](https://melbourneconnectscheduler.notion.site/Melbourne-Connect-Scheduler-71dc210789f941d7a2a97a74bc7ea83a)
