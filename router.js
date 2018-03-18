'use strict';

const express = require('express');

const router  = express.Router();


router.get('/', function(req, res) {
  // api.getAllProjects();
  res.send('this is the home/projects page');
});

router.get('/project/:id', function(req, res) {
  // api.getProject(req.params.id);
  res.send('this is a project page');
});

router.get('/contacts', function(req, res) {
  // api.getAllContacts();
  res.send('this is the contacts page');
});

router.get('/imprint', function(req, res) {
  // render file imprint
  res.send('this is the imprint page');
});

module.exports = router;
