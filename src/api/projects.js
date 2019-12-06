import { get, post, patch } from './api';

export async function getAll() {
  const query = 
  `SELECT 
      p.id, p.title, p.image as imageId, i.filename, i.fileformat
    FROM project p
    LEFT JOIN image i ON i.id = p.image`;

  return get(query).catch(err => err);
}

export async function getOne(id) {
  const query = 
    `SELECT 
        p.id, p.title, p.description, p.category, p.start_year, p.end_year, 
        p.address, p.postcode, p.city, p.gross_area, p.floor_area, p.phases, 
        p.client, p.image
      FROM project p
      WHERE id = ${id}`;

  return get(query).catch(err => err);
}

export async function create(data) {
  const fields = ['title', 'description', 'category', 'start_year', 
  'end_year', 'address', 'postcode', 'city', 'gross_area', 'floor_area', 
  'phases', 'client', 'image'];

  const columns = [];
  const values = [];
 
  fields.forEach (function (f) {
    if (data[f]) {
      columns.push(f);
      // TODO protect against sql injection
      values.push(`"${data[f]}"`);
    }
  });

  // created_at
  const columnsAsStr = columns.join(',');
  const valuesAsStr = values.join(',');

  const query = 
    `INSERT INTO project (${columnsAsStr})
     VALUES (${valuesAsStr})`;

  return post(query).catch(err => err);
}

export async function update(id, data) {
  // TODO protect against sql injection
  // TODO validate data
  const fields = ['title', 'description', 'category', 'start_year', 
  'end_year', 'address', 'postcode', 'city', 'gross_area', 'floor_area', 
  'phases', 'client', 'image'];
  
  let values = [];
  fields.forEach (function (f) {
    if (data[f])
      values.push(`${f} = "${data[f]}"`)
  });
  // values.push(`updated_at = ${new Date}`);
  const valuesAsStr = values.join(',');

  const query = 
    `UPDATE project
     SET ${valuesAsStr}
     WHERE id = ${id}`;
     // updated_at

  return patch(query).catch(err => err);
}