var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
require('dotenv').config();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pocket Sandwich' });
});

/* LOGIN page */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* REGISTER page */
router.get('/register', function(req, res, next) {
  res.render('register');
});

/* PROFILE page */
router.get('/profile', function(req, res, next) {
  res.render('profile', { name: 'Profile Page' });
});

/* SEARCH page */
router.get('/search', function(req, res, next) {
  res.render('search');
});

module.exports = router;
