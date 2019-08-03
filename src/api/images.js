import { get, post } from './api';

export function getAllByProjectId(projectId) {
  const query = 
    `SELECT i.id, i.caption, i.author, i.filename, i.fileformat
       FROM image i
      WHERE i.id in (
        SELECT pi.image_id
        FROM project_image pi
        WHERE pi.project_id = ${projectId}
       )`;

  const errorHanlder = function (err) {
    console.log("ERROR @images.getAllByProjectId()", err);
    return err;
  }

  return get(query, errorHanlder);
}

export function getOne(id) {
  const query = 
    `SELECT i.id, i.caption, i.author, i.filename, i.fileformat
      FROM image i
      WHERE id = ${id}`;

  const errorHanlder = function (err) {
    console.log("ERROR @image.getOne()");
    return err;
  }

  return get(query, errorHanlder);
}

export function getAll() {
  const query = 
    `SELECT i.id, i.caption, i.author, i.filename, i.fileformat
       FROM image i`;

  const errorHanlder = function (err) {
    console.log("ERROR @image.getAll()");
    return err;
  }

  return get(query, errorHanlder);
}

export function create(data) {
  // TODO protect against sql injection
  const query = 
    `INSERT INTO image
      (caption, author, filename, fileformat)
     VALUES (
      "${data.caption}",
      "${data.author}",
      "${data.filename}",
      "${data.fileformat}"
    )`;


  const errorHanlder = function (err) {
    console.log("ERROR @image.create()");
    return err;
  }

  return post(query, errorHanlder);
}

export function linkToProject(imageId, projectId) {
  // TODO protect against sql injection
  const query = 
    `INSERT INTO project_image
      (project_id, image_id)
     VALUES (${projectId}, ${imageId})`;

  const errorHanlder = function (err) {
    console.log("ERROR @image.update()");
    return err;
  }

  return get(query, errorHanlder);
}

export function unlinkFromProject(imageId, projectId) {
  // TODO protect against sql injection
  const query = 
    `DELETE FROM project_image
     WHERE project_id = ${projectId} AND image_id = ${imageId}`;

  const errorHanlder = function (err) {
    console.log("ERROR @image.update()");
    return err;
  }

  return get(query, errorHanlder);
}

export function update(id, data) {
  // TODO protect against sql injection
  const columns = ['caption', 'author', 'filename', 'fileformat'];
  let values = [];
  for (col in columns) {
    if (data[col])
      values.push(`${col} = ${data[col]}`)
  }
  // values.push(`updated_at = ${new Date}`);
  const valuesAsStr = fields.join(',');

  const query = 
    `UPDATE image
     SET ${valuesAsStr}
     WHERE id = ${id}`;
     // updated_at

  const errorHanlder = function (err) {
    console.log("ERROR @image.update()");
    return err;
  }

  return get(query, errorHanlder);
}