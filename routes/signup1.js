const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');                                        // Marvin
const urlencodedParser = bodyParser.urlencoded({ extended: true });               // Marvin

router.get('/', (req, res) => {                                                   // Inge
  res.render('signup1');
});

router.post('/', urlencodedParser, (req, res) => {                                // Inge
  req.session.user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };
  res.redirect('signup2');
});

module.exports = router;
