'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

import router from './router';


let env;
if (process.env.NODE_ENV !== 'production') {
  env = dotenv.config();
	if (env.error) {
	  throw env.error;
	}
}

const app = express();

// Middleware
app.use(morgan('dev')); // logging middleware: https://github.com/expressjs/morgan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const staticMiddleware = express.static('dist');
app.use(staticMiddleware);

// cors
const originsWhitelist = [
  'http://localhost:3000',
  // 'http://www.myproductionurl.com'
];
const corsOptions = {
  origin: function(origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
app.use(cors(corsOptions));

// Routes
app.use('/', router);
app.use(function (req, res, next) {
	console.log('404 - Client tried to get [' + req.url + ']');
  res.status(404).send('Not found');
});

const port = process.env.PORT || 8888;
app.listen(port);
console.log('Server running on port ', port);
