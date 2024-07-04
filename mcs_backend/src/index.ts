import express, { Application, Request, Response } from 'express';
import path from 'node:path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

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

const app = express();
// app.use(express.static(path.resolve(__dirname, '../game-101/build')));
app.use(bodyParser.json({limit: '200mb'})); //, type:'*/json'})); //! test to see if needed
app.use(bodyParser.urlencoded({limit: "200mb", extended: true, parameterLimit:100000}));
app.use(bodyParser.text({ limit: '2000mb' }));


app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, )); // '../game-101/build/index.html')); //! Change to Frontend index (home) page 
});

app.set('port', process.env.PORT || 4000);

let speaker = String(process.env.SPEAKERS);
let trip = String(process.env.TRIP);
let test : TableFields = {
  "id": "receTHv9Ryfr4RSI2",
  "fields": {
    "Guest_Speaker": [
      "reclU2YPWmZwKE8Hd"
    ],
    "StartDate": "2024-04-01",
    "EndDate": "2024-04-30",
    "Accommodation": [],
    "Local_Transport": [],
    "Flight": [],
    "Academic_Canvassing": [],
    "Completed": false,
  }
};

app.listen(app.get('port'), async () => {
  console.log(`Express web app available at localhost: ${app.get('port')}`);
  // console.log( await getTable(speaker));
  // console.log( await getTable(trip, PresetFilter.completed));
  console.log( await updateRecord(trip, [test]));
});

export default app;
