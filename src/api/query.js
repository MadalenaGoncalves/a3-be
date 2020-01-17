import mysql from 'mysql';

import db from '../connection';
import  { MysqlSyntaxError } from '../errors';
// do I really need to return resolve/reject
//  or just the promise?

function query(q) {
  return new Promise(function (resolve, reject) {
    if (!validateQuery(q))
      return reject(new MysqlSyntaxError("Invalid query syntax" + q));

    db.query(q, function(error, data, fields) {
      
      if (error) {
        return reject(error);
      }

      console.log('@query OK');
      return resolve(data);
    });
  });
}

// TODO
function validateQuery(q) {
  return true;
}

export default query;