'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connection = require('./connection');

let env;
if (process.env.NODE_ENV !== 'production') {
  env = require('dotenv').config();
	if (env.error) {
	  throw env.error;
	}
}

const port = process.env.PORT || 8081;

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const router = require('./router');
app.use('/', router);
app.use(function (req, res, next) {
	console.log('404 - Client tried to get [' + req.url + ']');
	res.status(404).send('404 - Sorry cant find that!');
});

app.listen(port);
console.log('Server running on port ', port);
