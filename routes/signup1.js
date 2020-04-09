const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {                                                   // Inge
  res.render('signup1');
});

router.post('/', (req, res) => {
  req.session.user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };
  res.redirect('signup2');
});

module.exports = router;
