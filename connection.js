'use strict';

const mysql = require('mysql');
let env;
if (process.env.NODE_ENV !== 'production') {
  env = require('dotenv').config();
	if (env.error) {
	  throw env.error;
	}
}
// console.log(env.parsed)

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect(function(err) {
  if (err) {
		console.log('ERROR connecting to DB', err);
		throw err;
	}
  console.log('Connected!');
});

module.exports = connection;
