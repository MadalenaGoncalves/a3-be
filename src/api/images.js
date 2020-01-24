export function getOne(id) {
  const q = 
    `SELECT i.id, i.caption, i.filename, i.fileformat, i.is_photo
    FROM image i
    WHERE id = ${id}`;
  return q;
}

export function getOneThumbnail(projectId) {
  const q = 
    `SELECT i.id, i.filename, i.fileformat
    FROM image i
    LEFT JOIN project p ON p.image = i.id
    WHERE p.id = ${projectId}`;
  return q;
}

export function getAllFileNamesByProjectId(projectId) {
  const q = 
    `SELECT CONCAT(i.filename, ".", i.fileformat) id
    FROM image i
    LEFT JOIN project p ON p.image = i.id
    WHERE p.id = ${projectId}`;

  return q;
}

const sql_GetAllByProjectAndIsPhoto = 
`SELECT i.id, i.caption, i.filename, i.fileformat, i.weight
FROM image i
LEFT JOIN project_image pi ON i.id = pi.image_id
WHERE pi.project_id = {projectId}
AND i.is_photo = {isPhoto}
ORDER BY CASE WHEN i.weight IS NULL THEN 1 ELSE 0 END, i.weight`;

export function getAllPhotosByProjectId(projectId) {
  const q = sql_GetAllByProjectAndIsPhoto
    .replace('{projectId}', projectId)
    .replace('{isPhoto}', 1);
  return q;
}

export function getAllDesignsByProjectId(projectId) {
  const q = sql_GetAllByProjectAndIsPhoto
    .replace('{projectId}', projectId)
    .replace('{isPhoto}', 0);
  return q;
}

export function createMinimal(data) {
  const q = 
    `INSERT INTO image
      (filename, fileformat)
     VALUES (
      "${data.filename}",
      "${data.fileformat}"
    )`;
  return q;
}

export function create(data) {
  const q = 
    `INSERT INTO image
      (caption, filename, fileformat, is_photo)
     VALUES (
      "${data.caption}",
      "${data.filename}",
      "${data.fileformat}",
      ${data.is_photo}
    )`;
  return q;
}

export function update(id, data) {
  const fields = ['caption', 'filename', 'fileformat'];
  
  let values = [];
  fields.forEach (function (f) {
    if (data[f])
      values.push(`${f} = "${data[f]}"`)
  });

  if (!!data['is_photo'])
    values.push(data['is_photo'])

  const valuesAsStr = values.join(',');

  const q = 
    `UPDATE image
     SET ${valuesAsStr}
     WHERE id = ${id}`;

  return q;
};


// export function linkToProject(imageId, projectId) {
//   const q = 
//     `INSERT INTO project_image
//       (project_id, image_id)
//      VALUES (${projectId}, ${imageId})`;

//   const errorHandler = function (err) {
//     console.log("ERROR @image.update()");
//     return err;
//   }

//   return get(q, errorHandler);
// }

export function deleteOne(id) {
  const q = 
    `DELETE FROM image
     WHERE id = ${id}`;
  return q;
}

export function deleteAllByProjectId(projectId) {
  const q = 
    `DELETE FROM image
     WHERE id in (
       SELECT p.image
         FROM project p
        WHERE p.id = ${projectId}
        UNION ALL
        SELECT pi.image_id
          FROM project_image pi
          WHERE pi.project_id = ${projectId}
     )`;
  return q;
}

export function deleteOneByContactId(contactId) {
  const q = 
    `DELETE FROM image
     WHERE id in (
       SELECT c.image
         FROM contact c
        WHERE c.id = ${contactId})`;
  return q;
}