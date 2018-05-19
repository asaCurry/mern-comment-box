// server.js

// Dependencies

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

// and create our instances

const app = express();
const router = express.Router();

// set our port to eitehr a predetermined port number if you have set it up, or 3001

const API_PORT = process.env.API_PORT || 3001;

//now we should configure the API to use bodyParser and look for JSON data in the reqeust body

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// now we can set the route path and initialize the API_PORT
router.get('/',(req,res) => {
  res.json({message: 'Hello, World!'});
});

//use our router configuration when we call /API

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
