import HttpStatus from 'http-status-codes';
// import Errors from '../errors';

export function handleError(err, code = HttpStatus.INTERNAL_SERVER_ERROR) {
  const json = {};

  if (err.sql) {
    json.status = HttpStatus.INTERNAL_SERVER_ERROR;
    json.error = {};
    json.error.code = error.code;
    json.error.message = error.sqlMessage;
    return json;
  }

  json.status = code;
  json.error = {};
  json.error.code = code;
  json.error.message = err;
  return json;

  // if (err instanceof Errors.BadRequest)
  //   return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
  // if (err instanceof Errors.Forbidden)
  //   return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
  // if (err instanceof Errors.NotFound)
  //   return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
  // if (err instanceof Errors.UnprocessableEntity)
  //   return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
  // console.log(err);
  // return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
}

export function handleNotModified() {
  const json = {};
  json.status = HttpStatus.NOT_MODIFIED;
  return json;
}