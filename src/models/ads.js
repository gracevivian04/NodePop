'use strict'

const mongoose = require('mongoose');

const advertSchema = mongoose.Schema({
  name: {
    type: String
  },
  sale: {
    type: Boolean
  },
  price: {
    type: Number
  },
  photo: {
    type: String
  },
  tags: {
    type: [String]
  }
},
{ collection: 'adverts'});

// model 
const Advert = mongoose.model('Advert', advertSchema);

// export model 
module.exports = Advert