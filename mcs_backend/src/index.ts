import express from 'express';
import cors from 'cors';

const app = express();
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json());

require('./controller/events')(app);

app.listen(4000, () => {
  console.log(`server running on port 4000`);
});