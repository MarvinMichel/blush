const express = require('express');                                               // Marvin
const router = express.Router();                                                  // Marvin
const bodyParser = require('body-parser');                                        // Marvin
const urlencodedParser = bodyParser.urlencoded({ extended: true });               // Marvin
const server = require('../server');                                              // Marvin

// Convert birthday to age                                                        // Marvin
const getAge = (birth) => {
  const today = new Date();
  return Math.floor((today - birth) / (365.25 * 24 * 60 * 60 * 1000));
}

router.get('/', (req, res) => {                                                  // Inge
  res.render('signup');
});

router.post('/', urlencodedParser, (req, res) => {                                                 // Inge
  const age = getAge(new Date(req.body.birthday));
  server.createUser(
    req.session.user.email,
    req.session.user.password,
    req.session.user.firstName,
    req.session.user.lastName,
    age,
    req.body.gender
  );
  res.redirect('feed');
});

module.exports = router;
