import { get, post, patch } from './api';

export async function getAll() {
  const query = 
    `SELECT id, department, name, address, postcode, city, phone, fax, url
     FROM contact`;

  return get(query).catch(err => err);
};

export async function getOne(id) {
  const query = 
    `SELECT id, department, name, address, postcode, city, phone, fax, url
     FROM contact
     WHERE id = ${id}`;

    return get(query).catch(err => err);
};

export async function create(data) {
  const query = 
    `INSERT INTO contact
      (department, name, address, postcode, city, phone, fax, url)
     VALUES
     ${data.department},
     ${data.name},
     ${data.address},
     ${data.postcode},
     ${data.city},
     ${data.phone},
     ${data.fax},
     ${data.url}`;
     // created_at

  return post(query).catch(err => err);
};

export async function update(id, data) {
  const fields = ['department', 'name', 'address', 'postcode', 
  'city', 'phone', 'fax', 'url'];
  
  let values = [];
  fields.forEach (function (f) {
    if (data[f])
      values.push(`${f} = "${data[f]}"`)
  });
  // values.push(`updated_at = ${new Date}`);
  const valuesAsStr = values.join(',');

  const query = 
    `UPDATE contact
     SET ${valuesAsStr}
     WHERE id = ${id}`;
     // updated_at

  return patch(query).catch(err => err);
};

