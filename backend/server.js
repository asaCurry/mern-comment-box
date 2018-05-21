// server.js

// Dependencies

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getSecret } from './secrets';
import Comment from './models/comment';

// and create our instances

const app = express();
const router = express.Router();

// set our port to eitehr a predetermined port number if you have set it up, or 3001

const API_PORT = process.env.API_PORT || 3001;

// db config -- set your URI from mLab in secrets.js
mongoose.connect(getSecret('dbUri'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//now we should configure the API to use bodyParser and look for JSON data in the reqeust body

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// now we can set the route path and initialize the API_PORT
router.get('/',(req,res) => {
  res.json({message: 'Hello, World!'});
});

router.get('/comments', (req, res) => {
  Comment.find((err,comments) => {
    if (err) return res.json({success: false, error: err});
    return res.json({success: true, data:comments })
  });
});

router.post('/comments', (req,res) => {
  const comment = new Comment();
  //body parser lets us use the req.body
  const { author, text } = req.body;
  if (!author || !text) {
    return res.json ({
      success:false,
      error: 'You must provide an author and comment'
    });
  }
  comment.author = author;
  comment.text = text;
  comment.save (err => {
    if (err) return res.json ({success: flase, error: err });
    return res.json({success: true});
  });
});
//use our router configuration when we call /API

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
