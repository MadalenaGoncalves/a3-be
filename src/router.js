'use strict';

import express from 'express';
import path from 'path';
import api from './api';

const router = express.Router();

function handleResponse(res, result) {
  console.log("handling response");
  res.setHeader('Content-Type', 'application/json');
  res.status(result.status);
  res.send(result);
  // TODO check if res.json is better than res.send
}


router.get('/projects', async function(req, res) {
  const result = await api.projects.getAll();
  handleResponse(res, result);
});

router.get('/projects/:id', async function(req, res) {
  const project = await api.projects.getOne(req.params.id);
  const images = await api.images.queryAllByProjectId(req.params.id);
  if (!!images) {
    // handle errors
    project.data[0].relations = {};
    project.data[0].relations.images = images;  
  };

  handleResponse(res, project);
});

router.get('/projects/:id/images', async function(req, res) {
  const result = await api.images.getAllByProjectId(req.params.id);
  handleResponse(res, result);
});

router.get('/images/:id', async function(req, res) {
  const result = await api.images.getOne(req.params.id);
  handleResponse(res, result);
});

router.get('/contacts', async function(req, res) {
  const result = await api.contacts.getAll();
  handleResponse(res, result);
});

router.get('/contacts/:id', async function(req, res) {
  const result = await api.contacts.getOne(req.params.id);
  handleResponse(res, result);
});

// POST / PATCH
router.post('/projects', async function(req, res) {
  const result = await api.projects.create(req.body);
  handleResponse(res, result);
});

router.patch('/projects/:id', async function(req, res) {
  console.log('@patch project', req.params.id, req.body);
  const result = await api.projects.update(req.params.id, req.body);
  console.log('@patch after', result);
  handleResponse(res, result);
});

router.post('/images', async function(req, res) {
  const result = await api.images.create(req.body);
  handleResponse(res, result);
});

router.patch('/images/:id', async function(req, res) {
  const result = await api.images.update(req.params.id, req.body);
  handleResponse(res, result);
});

router.post('/contacts', async function(req, res) {
  const result = await api.contacts.create(req.body);
  handleResponse(res, result);
});

router.patch('/contacts/:id', async function(req, res) {
  const result = await api.contacts.update(req.params.id, req.body);
  handleResponse(res, result);
});


export default router;

