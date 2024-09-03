import express, { Application, Request, Response } from 'express';
import path from 'node:path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import authenticateJWT from './middleware/authenticationJWT';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const tripRouter = require('./controller/trip'); 
const accommodationRouter = require('./controller/accommodation');
const miscellaneousRouter = require('./controller/miscellaneous');
const flightRouter = require('./controller/flight'); 
const academicRouter = require('./controller/academic'); 
const canvassingRouter = require('./controller/canvassing'); 
const speakerRouter = require('./controller/speaker'); 
const mainEventRouter = require('./controller/mainEvent')
const cateringRouter = require('./controller/catering'); 
const serviceRouter = require('./controller/service'); 
const venueRouter = require('./controller/venue');
const subEventRouter = require('./controller/subEvent');
const LoginRouter = require('./controller/Login'); 
const fundingAccountRouter = require('./controller/fundingAccount');
const financeRouter = require('./controller/finance');
const FormRouter = require('./controller/guestSpeakerForm');
const app = express();

app.use(cors())
app.use((req: Request, res: Response, next: () => void) => {
  if (req.path.startsWith('/login')) {
    return next();
  }
  authenticateJWT(req, res, next);
});//ALL USE AUTHENTICATION except login
app.use(bodyParser.json({limit: '200mb'})); 
app.use(bodyParser.urlencoded({limit: "200mb", extended: true, parameterLimit:100000}));
app.use(bodyParser.text({ limit: '2000mb' }));

//require('./controller/events')(app);
app.use('/', tripRouter);
app.use('/', accommodationRouter);
app.use('/', miscellaneousRouter);
app.use('/', flightRouter);
app.use('/', academicRouter);
app.use('/', canvassingRouter);
app.use('/', speakerRouter);
app.use('/', mainEventRouter)
app.use('/', cateringRouter);
app.use('/', serviceRouter);
app.use('/', LoginRouter);
app.use('/', venueRouter);
app.use('/', subEventRouter);
app.use('/', fundingAccountRouter);
app.use('/', financeRouter);
app.use('/', FormRouter);
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, )); //! Change to Frontend index (home) page 
});

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), async () => {
  console.log(`Express web app available at localhost: ${app.get('port')}`);
});

export default app;

