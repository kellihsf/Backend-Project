var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR));
const {User} = require('../models');
const jwt = require('jsonwebtoken');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* CREATE a new user */
router.post('/register', async (req, res) => {
  const {email, password} = req.body
  const hash = bcrypt.hashSync(password, saltRounds);

  const user = await User.create({
    email: email,
    password: hash,
  });
  res.redirect(`/confirmation`);
});

/* USER login */
router.post('/login', async (req, res) => {
  const {email, password} = req.body //req.body.email req.body.password 

  const user = await User.findOne({
    where: {
      email: email
    }
  });

  if (user){
// takes our user input password from req.body, uses bcrypt to hash it and checks that that hash is the same as the already hashed password in our DB
    console.log(password);
    console.log(user.password);
    const comparePass = bcrypt.compareSync(password, user.password)
    console.log(comparePass);
    if (comparePass === true) {
      const token = jwt.sign(
        {
          data: user.email,
        },
        process.env.SECRET_KEY,
        {expiresIn: "1h"}
      );
      res.cookie("token", token)
      res.redirect(`/profile/${user.id}`);
    } else {
      res.send('Sorry, wrong password!')
    }
  } else {
    res.send("Sorry, no user found")
  }
});

module.exports = router;
