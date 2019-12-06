import { get, post, query } from './api';

export function queryAllByProjectId(projectId) {
  const q = 
    `SELECT i.id, i.caption, i.author, i.filename, i.fileformat, i.is_photo
       FROM image i
       LEFT JOIN project_image pi ON i.id = pi.image_id
      WHERE pi.project_id = ${projectId}`;

  return query(q);
}

export function getAllByProjectId(projectId) {
  const q = 
  `SELECT i.id, i.caption, i.author, i.filename, i.fileformat, i.is_photo
     FROM image i
     LEFT JOIN project_image pi ON i.id = pi.image_id
    WHERE pi.project_id = ${projectId}`;

  const errorHanlder = function (err) {
    console.log("ERROR @images.getAllByProjectId()", err);
    return err;
  }

  return get(q, errorHanlder);
}

export function getOne(id) {
  const q = 
    `SELECT i.id, i.caption, i.author, i.filename, i.fileformat, i.is_photo
      FROM image i
      WHERE id = ${id}`;

  const errorHanlder = function (err) {
    console.log("ERROR @image.getOne()");
    return err;
  }

  return get(q, errorHanlder);
}

export function getAll() {
  const q = 
    `SELECT i.id, i.caption, i.author, i.filename, i.fileformat, i.is_photo
       FROM image i`;

  const errorHanlder = function (err) {
    console.log("ERROR @image.getAll()");
    return err;
  }

  return get(q, errorHanlder);
}

export function create(data) {
  // TODO protect against sql injection
  const q = 
    `INSERT INTO image
      (caption, author, filename, fileformat, is_photo)
     VALUES (
      "${data.caption}",
      "${data.author}",
      "${data.filename}",
      "${data.fileformat}",
      ${data.is_photo}
    )`;


  const errorHanlder = function (err) {
    console.log("ERROR @image.create()");
    return err;
  }

  return post(q, errorHanlder);
}

export function linkToProject(imageId, projectId) {
  // TODO protect against sql injection
  const q = 
    `INSERT INTO project_image
      (project_id, image_id)
     VALUES (${projectId}, ${imageId})`;

  const errorHanlder = function (err) {
    console.log("ERROR @image.update()");
    return err;
  }

  return get(q, errorHanlder);
}

export function unlinkFromProject(imageId, projectId) {
  // TODO protect against sql injection
  const q = 
    `DELETE FROM project_image
     WHERE project_id = ${projectId} AND image_id = ${imageId}`;

  const errorHanlder = function (err) {
    console.log("ERROR @image.update()");
    return err;
  }

  return get(q, errorHanlder);
}

export function update(id, data) {
  // TODO protect against sql injection
  const columns = ['caption', 'author', 'filename', 'fileformat'];
  let values = [];
  for (col in columns) {
    if (data[col])
      values.push(`${col} = ${data[col]}`)
  }
  if (!!data['is_photo'])
    values.push(data['is_photo'])

  // values.push(`updated_at = ${new Date}`);
  const valuesAsStr = fields.join(',');

  const q = 
    `UPDATE image
     SET ${valuesAsStr}
     WHERE id = ${id}`;
     // updated_at

  const errorHanlder = function (err) {
    console.log("ERROR @image.update()");
    return err;
  }

  return get(q, errorHanlder);
}