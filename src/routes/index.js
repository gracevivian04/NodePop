const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nodepop' });
});

module.exports = router;

/* const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const adRoutes = require('./routes/advert');

const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use('/api', adRoutes);


// routes
app.get('/', (req, res) => {
  res.send('Welcome to my API')
});

// mongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to MongoDB atlas'))
  .catch((error) => console.error(error));

app.listen(port, () => console.log('server listening on port', port));*/