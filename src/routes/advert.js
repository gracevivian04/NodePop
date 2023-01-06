'use strict'

const express = require('express');
const createError = require('http-errors');
const Advert = require('../models/ads');

const router = express.Router();

// CRUD

// create listing
router.post('/adverts', (req, res) => {
  res.send('create listing');
});

module.exports = router;