'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

import router from './router';

let env = dotenv.config();

const app = express();

// Middleware
app.use(morgan('dev')); // logging middleware: https://github.com/expressjs/morgan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// cors
const originsWhitelist = [
  'http://localhost:3000',
  'https://a3-architekten-client.herokuapp.com'
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
app.use('/api/', router);
app.use('/thumbnail', express.static('public/thumbnails'));
app.use('/image', express.static('public/images'));

app.use(function (req, res, next) {
	console.log('404 - Client tried to get [' + req.url + ']');
  res.status(404).send('Not found');
});

const port = process.env.PORT || 8888;
app.listen(port);
console.log('Server running on port ', port);
