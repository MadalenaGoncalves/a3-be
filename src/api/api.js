import db from '../connection';
// import async from 'async';

const STATUS_SUCCESS = 200;
const STATUS_CREATED = 201;

export function get(query, errorHandler) {
  return new Promise(function (resolve, reject) {
    db.query(query, function(error, results, fields) {
      
      if (error) {
        console.log('ERROR @get', err);
        return reject(errorHandler(err));
      }

      // console.log('GET RESULTS', results);
      return resolve({
        status: STATUS_SUCCESS,
        error: null,
        data: results
      });
    });
  });
}

export function post(query, errorHandler) {
  return new Promise(function (resolve, reject) {
    db.query(query, function(error, results, fields) {
      
      if (error) {
        console.log('ERROR @post', error);
        return reject(errorHandler(error));
      }
      
      return resolve({
        status: STATUS_CREATED,
        error: null,
        data: results
      });
    });
  });
}