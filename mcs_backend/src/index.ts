import express, { Application, Request, Response } from 'express';
import path from 'node:path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';


import { 
    getTable,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecords
  } from './models/airtable';

import { 
    PresetFilter,
    TableFields
  } from './types/types';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const tripRouter = require('./controller/trip'); 
const accommodationRouter = require('./controller/accomodation');
const miscellaneousRouter = require('./controller/miscellaneous');
const flightRouter = require('./controller/flight'); 
const academicRouter = require('./controller/academic'); 
const canvassingRouter = require('./controller/Canvassing'); 
const speakerRouter = require('./controller/speaker'); 
const app = express();

app.use(cors())
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
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, )); //! Change to Frontend index (home) page 
});

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), async () => {
  console.log(`Express web app available at localhost: ${app.get('port')}`);
});

export default app;

