const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const server = require('../server');

router.get('/', (req, res) => {
  res.render('feed');
});

module.exports = router;