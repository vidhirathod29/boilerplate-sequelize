const express = require('express');
const app = express();
require('./models/db');
const route= require('./routes/routes');

const bodyParse = require('body-parser');

require('dotenv').config();
app.use(express.json());
app.use(bodyParse.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',route);
app.use(require('./helper/error').handleJoiErrors);
app.use(require('./helper/error').handleErrors);


const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
