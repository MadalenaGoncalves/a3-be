import db from '../connection';
// import async from 'async';

const STATUS_SUCCESS = 200;
const STATUS_CREATED = 201;
const STATUS_UNPROCESSABLE_ENTITY = 422;

export function query(q) {
  return new Promise(function (resolve, reject) {
    db.query(q, function(error, data, fields) {
      
      if (error) {
        console.log('@query ERROR', error);
        return reject(error);
      }

      console.log('@query OK');
      return resolve(data);
    });
  });
}

export function get(query, errorHandler) {
  return new Promise(function (resolve, reject) {
    db.query(query, function(error, results, fields) {
      
      if (error) {
        console.log('ERROR @get', error);
        return reject(errorHandler(error));
      }

      // console.log('GET RESULTS', results);
      return resolve({
        status: STATUS_SUCCESS,
        // error: null,
        data: results
      });
    });
  });
}

export function post(query, errorHandler) {
  return new Promise(function (resolve, reject) {
    db.query(query, function(error, results, fields) {
      
      if (error) {
        console.log('ERROR @post', error.code, error.sqlMessage);
        return reject(errorHandler(error));
      }
      
      return resolve({
        status: STATUS_CREATED,
        // error: null,
        data: results
      });
    });
  });
}

export function patch(query) {
  return new Promise(function (resolve, reject) {
    db.query(query, function(error, results, fields) {
      
      if (error) {
        console.log('ERROR @patch', error.code, error.sqlMessage);
        return reject({
          status: STATUS_UNPROCESSABLE_ENTITY,
          error,
        });
      }
      
      return resolve({
        status: STATUS_SUCCESS,
        data: results
      });
    });
  });
}