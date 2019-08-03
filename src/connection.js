'use strict';

import 'dotenv/config';
import mysql from 'mysql';

const options = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};
const connection = mysql.createConnection(options);

connection.connect(function(err) {
  if (err) {
		console.log('ERROR connecting to DB', err);
		throw err;
	}
  console.log('DB connected!');
});

// connection.end();

export default connection;
