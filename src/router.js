'use strict';

import express from 'express';
import api from './api';

const router = express.Router();

function handleResponse(res, result) {
  res.setHeader('Content-Type', 'application/json');
  res.send(result);
}


// RESOURCES ACCESSED BY THE WEBSITE
router.get('/projects', async function(req, res) {
  const result = await api.projects.getAll();
  handleResponse(res, result);
});

router.get('/projects/:id', async function(req, res) {
  const results = await api.projects.getOne(req.params.id);
  handleResponse(res, results);
});

router.get('/projects/:id/images', async function(req, res) {
  const result = await api.images.getAllByProjectId(req.params.projectId);
  handleResponse(res, result);
});

router.get('/image/:id', async function(req, res) {
  const result = await api.images.getOne(req.params.id);
  handleResponse(res, result);
});

router.get('/contacts', async function(req, res) {
  const result = await api.contacts.getAll();
  handleResponse(res, result);
});

// RESOURCES ACCESSED BY THE ADMIN
// router.post('/login', async function(req, res) {
//   // const result = await api.authenticate(req.params.user, req.params.pass);
//   res.send('post /login');
// });

// router.get('/logout', async function(req, res) {
//   // const result = await api.logout();
//   // res.redirect('/');
//   res.send('get /logout');
// });

router.get('/admin/all', async function(req, res) {
  let projects;
  let images;
  let contacts;
  await Promise.all([
    api.projects.getAll().then(result => Promise.resolve( projects = result.data )),
    api.images.getAll().then(result => Promise.resolve( images = result.data )),
    api.contacts.getAll().then(result => Promise.resolve( contacts = result.data )),
  ]);
  // const result = await api.categories.getAll();
  const result = {
    status: 200,
    error: null,
    data: {
      projects,
      images,
      contacts
    }
  };
  handleResponse(res, result);
});

router.get('/admin/project/:id', async function(req, res) {
  const results = await api.projects.getOne(req.params.id);
  handleResponse(res, results);
});

router.post('/admin/project', async function(req, res) {
  console.log('@post project', req.body);
  let result;
  try {
    result = await api.projects.create(req.body);
  } catch(e) {
    console.log('fuuuuuuuu', e);
  }
  console.log('@post after', result);
  handleResponse(res, result);
});

router.patch('/admin/project/:id', async function(req, res) {
  console.log('@patch project', req.params.id, req.body);
  const result = await api.projects.update(req.params.id, req.body);
  console.log('@patch after', result);
  handleResponse(res, result);
});



router.get('/admin/image/:id', async function(req, res) {
  const result = await api.images.getOne(req.params.id);
  handleResponse(res, result);
});

router.post('/admin/image', async function(req, res) {
  const result = await api.images.create(req.body);
  handleResponse(res, result);
});

router.patch('/admin/image/:id', async function(req, res) {
  const result = await api.images.update(req.params.id, req.body);
  handleResponse(res, result);
});



router.get('/admin/contact/:id', async function(req, res) {
  const result = await api.contacts.getOne(req.params.id);
  handleResponse(res, result);
});

router.post('/admin/contact', async function(req, res) {
  const result = await api.contacts.create(req.body);
  handleResponse(res, result);
});

router.patch('/admin/contact/:id', async function(req, res) {
  const result = await api.contacts.update(req.params.id, req.body);
  handleResponse(res, result);
});

export default router;