# Melbourne Connect Visit Scheduler

Melbourne Connect, powered by the University of Melbourne, is a collaborative digital innovation ecosystem hosting various events, including the AI@Melbourne Colloquium series. The current workflow for organising these events is manual and time-consuming, involving multiple steps and systems. The main issues include manual communication, logistical tracking via Excel, and lack of system integration. The desired solution is an all-in-one event planning system to centralise logistical information, streamline processes, and reduce the executive assistant's cognitive load. The project aims to create a user-friendly central dashboard covering aspects like guest invitations, travel arrangements, scheduling, catering, and financial management.

# Get started - Frontend

## Environment variables 
Please create a `.env` file with the variable and path descried in [Frontend ENV](https://melbourneconnectscheduler.notion.site/Environment-variables-0976a23502d4481f8cfb37ab251e741b?pvs=4) before proceeding

---

Please run the following commands in `frontend/mcs-frontend` directory 

### `npm install`
This command will install all necessary dependencies 
Please run this before running any other NPM Scripts 

### `npm start`
Runs this commend to start the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\
(Please ensure port 3000 on host machine is available before run the command)

### For more information please view the [Frontend README.md](frontend/mcs-frontend/README.md)

# Get started - Backend

## Environment variables 
Please create a `.env` file with the variable and path descried in [Backend ENV](https://melbourneconnectscheduler.notion.site/Environment-variables-b50021cfd9ef4d6499b610931b5d274e?pvs=4) before proceeding

---

Please run the following commands in `mcs_backend` directory

## Docker runnable
### `docker-compose up` or `docker compose up`

Depended on your docker compose version, version 1 and version 2 respectively,
this command will start the containers. And run the 
backend API server in development mode at [http://localhost:4000](http://localhost:4000) \
(Please ensure port 4000 on host machine is available before run the command)


### `docker-compose up --build` or `docker compose up --build`

Depended on your docker compose version, version 1 and version 2 respectively,
this command will build the Docker image and start the containers. And run the 
backend API server at [http://localhost:4000](http://localhost:4000) \
(Please ensure port 4000 on host machine is available before run the command)


## NPM Available Scripts

In the `mcs_backend` directory, you can run:

### `npm install`
This command will install all necessary dependencies 
Please run this before running any other NPM Scripts 

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in your browser.

The page will reload when you make changes.

### `npm run start`

Launches the backend server in production mode  

### For more information please view the [Backend README.md](mcs_backend/README.md)


# Artefacts, Deliverable and Documentation
Please visit our Notion site: [Melbourne Connect Scheduler](https://melbourneconnectscheduler.notion.site/Melbourne-Connect-Scheduler-71dc210789f941d7a2a97a74bc7ea83a)
