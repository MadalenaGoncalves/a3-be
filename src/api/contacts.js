import { get, post } from './api';

export function getAll() {
  const query = 
    `SELECT id, department, name, address, postcode, city, phone, fax, url
     FROM contact`;

  const errorHanlder = function (err) {
    console.log("ERROR @contacts.getAll()", err);
    return err;
  }

  return get(query, errorHanlder);
};

export function getOne(id) {
  const query = 
    `SELECT id, department, name, address, postcode, city, phone, fax, url
     FROM contact
     WHERE id = ${id}`;

  const errorHanlder = function (err) {
    console.log("ERROR @contacts.getOne()", err);
    return err;
  }

  return get(query, errorHanlder);
};

export function create(data) {
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

  const errorHanlder = function (err) {
    console.log("ERROR @contacts.create()", err);
    return err;
  }

  return post(query, errorHanlder);
};

export function update(id, data) {
  // TODO protect against sql injection
  // TODO validate data
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

  console.log('query', query);
  const errorHanlder = function (err) {
    console.log("ERROR @contact.update()");
    return err;
  }

  return get(query, errorHanlder);
};

// export function enable()
// export function disable()