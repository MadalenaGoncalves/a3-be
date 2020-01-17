export function getAllWithThumbnails() {
  const q = 
  `SELECT 
      p.id, p.title, p.image as imageId, i.filename, i.fileformat
    FROM project p
    LEFT JOIN image i ON i.id = p.image
    ORDER BY CASE WHEN p.weight IS NULL THEN 1 ELSE 0 END, p.weight`;
  return q;
}

export function getOne(id) {
  const q = 
    `SELECT 
        p.id, p.title, p.description, p.category, p.start_year, p.end_year, 
        p.address, p.postcode, p.city, p.gross_area, p.floor_area, p.phases, 
        p.client, p.image
      FROM project p
      WHERE id = ${id}`;
  return q;
}

export function create(data) {
  const fields = ['title', 'description', 'category', 'start_year', 
  'end_year', 'address', 'postcode', 'city', 'gross_area', 'floor_area', 
  'phases', 'client', 'image'];

  const columns = [];
  const values = [];
 
  fields.forEach (function (f) {
    if (data[f]) {
      columns.push(f);
      values.push(`"${data[f]}"`);
    }
  });

  const columnsAsStr = columns.join(',');
  const valuesAsStr = values.join(',');

  const q = 
    `INSERT INTO project (${columnsAsStr})
     VALUES (${valuesAsStr})`;
  return q;
}

export function update(id, data) {
  const fields = ['title', 'description', 'category', 'start_year', 
  'end_year', 'address', 'postcode', 'city', 'gross_area', 'floor_area', 
  'phases', 'client', 'image', 'weight'];
  
  let values = [];
  fields.forEach (function (f) {
    if (data[f])
      values.push(`${f} = "${data[f]}"`)
  });
  const valuesAsStr = values.join(',');

  const q = 
    `UPDATE project
     SET ${valuesAsStr}
     WHERE id = ${id}`;
  return q;
}

export function deleteOne(id) {
  const q = 
    `DELETE FROM project
     WHERE id = ${id}`;
  return q;
}