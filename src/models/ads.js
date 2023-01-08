'use strict'

const mongoose = require('mongoose');

// define ad schema 
const advertSchema = mongoose.Schema({
  // all properties are required 
  name: {
    type: String,
    index: true,
    required: true
  },
  sale: {
    type: Boolean, 
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
    required: true,
    unique: true
  },
  tags: {
    type: [String],
    required: true
  }
},
{ collection: 'adverts'});

// create model 
const Advert = mongoose.model('Advert', advertSchema);

// export model 
module.exports = Advert;