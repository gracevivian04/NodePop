'use strict'

const express = require('express');
const createError = require('http-errors');
const Advert = require('../../models/ads');

const router = express.Router();

// CRUD - Create, Read, Update, Delete

// GET api/adverts
// return ad listings
router.get('/', async (req, res, next) => {
  try {
    // filters 
    const name = req.query.name;
    const sale = req.query.sale;
    const price = req.query.price;
    const photo = req.query.photo;
    const tag = req.query.tag;

    // webpage
    const skip = req.query.skip;
    const limit = req.query.limit;

    // field selection 
    const fields = req.query.fields;

    // order
    const sort = req.query.sort;

    const filter = {};

    if (name) {
      filter.name = name;
    }

    if (sale) {
      filter.sale = sale;
    }

    if (price) {
      if (price.includes('-')){
        const prices = price.split('-');
        if(prices[0] === ''){
          filter.price = {$lte: prices[1]};
        } else if (prices[1] === ''){
          filter.price = {$gte: prices[0]};
        } else {
          filter.price = {$gte: prices[0], $lte: prices[1]}
        }
      } else {
        filter.price = price;
      }
    }

    if (photo) {
      filter.photo = photo;
    }

    if (tag) {
      filter.tags = tag;
    }

    const adverts = await Advert.list(filter, skip, limit, fields, sort);
    res.json({ results: adverts});
  } catch(err) {
    next(err);
  }
});

// GET /api/adverts/(id)
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    // search for an ad in the database 
    const ad = await Advert.findById(id);
    res.json({ result: ad });
  } catch (err) {
    next(err);
  }
});

// GET /api/advert/tags
router.get('/tags', function (req, res, next) {
  Advert.distinct("tags", function (err, tags) {
    res.send({ availableTags: tags });
  });
});
 
  /* try {
    const tag = req.query.tag;

    // search for a tag in the database 
    const existingTag = await Advert.tagList();
    res.json({ tag: existingTag });
  } catch (err) {
    next(err);
  }
});*/

// PUT /api/advert/(id) (body = advertData)
// update and advert
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const advertData = req.body;
    
    const updatedAdvert = await Advert.findOneAndUpdate({ _id: id }, advertData, {
      new: true // this will return the updated document 
    });
    res.json({ result: updatedAdvert });
  } catch (err) {
    next(err);
  }
});

// POST /api/advert (body = advertData)
router.post('/', async (req, res, next) => {
  try {
    const advertData = req.body;

    // depicts a new in-memory advert 
    const ad = new Advert(advertData);

    // save it in the database
    const savedAd = await ad.save();
    res.json({ result: savedAd});
  } catch (err) {
    next(err);
  }
});

// DELETE /api/advert/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const ad = await Advert.findById(id);

    if (!ad) {
      return next(createError(404));
    }
    await Advert.deleteOne({ _id: id });
    res.json();
  } catch (err) {
    next(err);
  }
});



module.exports = router;