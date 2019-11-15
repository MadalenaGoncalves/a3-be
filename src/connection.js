'use strict';

import 'dotenv/config';
import mysql from 'mysql';

let options = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

if (process.env.JAWSDB_URL) {
  console.log("Connection to JawsDB");
  options = process.env.JAWSDB_URL;
} else {
  console.log("Using local DB");
}
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
