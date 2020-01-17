export function getAllWithPhoto() {
  const q = 
    `SELECT c.id, c.department, c.name, c.address, c.postcode, c.city, 
        c.phone, c.fax, c.email, c.image as imageId, i.filename, i.fileformat
      FROM contact c
      LEFT JOIN image i on i.id = c.image
      ORDER BY CASE WHEN c.weight IS NULL THEN 1 ELSE 0 END, c.weight`;
  return q;
};

export function getOneWithPhoto(id) {
  const q = 
    `SELECT c.id, c.department, c.name, c.address, c.postcode, c.city, 
        c.phone, c.fax, c.email, c.image as imageId, i.filename, i.fileformat
      FROM contact c
      LEFT JOIN image i on i.id = c.image
     WHERE c.id = ${id}`;
  return q;
};

export function create(data) {
  const fields = ['department', 'name', 'address', 'postcode',
    'city', 'phone', 'fax', 'email', 'image'];

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
    `INSERT INTO contact (${columnsAsStr})
     VALUES (${valuesAsStr})`;
  return q;
}

export function update(id, data) {
  const fields = ['department', 'name', 'address', 'postcode', 
  'city', 'phone', 'fax', 'email', 'weight', 'image'];
  
  let values = [];
  fields.forEach (function (f) {
    if (data[f])
      values.push(`${f} = "${data[f]}"`)
  });
  const valuesAsStr = values.join(',');

  const q = 
    `UPDATE contact
     SET ${valuesAsStr}
     WHERE id = ${id}`;

  return q;
};

export function deleteOne(id) {
  const q = 
    `DELETE FROM contact
     WHERE id = ${id}`;
  return q;
}