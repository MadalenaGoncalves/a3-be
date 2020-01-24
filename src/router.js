'use strict';

import express from 'express';
import * as api from './api';

const router = express.Router();

function handleResponse(res, result) {
  res.setHeader('Content-Type', 'application/json');
  res.status(result.status);
  res.send(result);
  // TODO check if res.json is better than res.send
}

router.get('/projects', async function(req, res) {
  const result = await api.getAllProjectsWithThumbnails();
  handleResponse(res, result);
});

router.get('/projects/:id', async function(req, res) {
  const result = await api.getOneProjectWithRelations(req);
  handleResponse(res, result);
});

router.get('/contacts', async function(req, res) {
  const result = await api.getAllContactsWithPhoto();
  handleResponse(res, result);
});

router.get('/contacts/:id', async function(req, res) {
  const result = await api.getOneContactWithPhoto(req);
  handleResponse(res, result);
});


// POST
router.post('/projects', async function(req, res) {
  // handle insert to filesystem
  const result = await api.createProject(req);
  handleResponse(res, result);
});

router.post('/contacts', async function(req, res) {
  // handle insert to filesystem
  const result = await api.createContact(req);
  handleResponse(res, result);
});


// PATCH
router.patch('/projects/:id/meta', async function(req, res) {
  const result = await api.updateProjectMeta(req);
  handleResponse(res, result);
});

router.patch('/contacts/:id', async function(req, res) {
  const result = await api.updateContact(req);
  handleResponse(res, result);
});


// DELETE
router.delete('/projects/:id', async function(req, res) {
  const result = await api.deleteProject(req);
  handleResponse(res, result);
});

router.delete('/contacts/:id', async function(req, res) {
  const result = await api.deleteContact(req);
  handleResponse(res, result);
});


// // AUTH
// router.post('/login', async function(req, res) {
//   onst result = await api.authenticate(req.params.user, req.params.pass);
//   res.send('post /login');
// });

// router.get('/logout', async function(req, res) {
//   const result = await api.logout();
//   res.redirect('/');
//   res.send('get /logout');
// });

export default router;

// router.get('/all', async function(req, res) {
//   let projects;
//   let contacts;
//   await Promise.all([
//     api.projects.getAll().then(
//       result => Promise.resolve(projects = result.data )),
//     api.contacts.getAll().then(
//       result => Promise.resolve(contacts = result.data )),
//   ]);
//   const result = await api.categories.getAll();
// });