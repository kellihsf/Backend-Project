var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
require('dotenv').config();

/* SEARCH page */
router.get('/', function(req, res, next) {
  res.render('restaurant', { name: 'Search for Restaurants' });
});

// Results page 
router.post('/search', function(req, res, next) {
  console.log("Body:", req.body)

  // This gets the zipcode and type of food from the body object
  const {zipcode, type_of_food} = req.body
 res.render('results', req.body)
})


module.exports = router;