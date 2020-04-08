const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');                                                 // Jade
const saltRounds = 10;                                                            // Jade
const myPlaintextPassword = 's0/\/\P4$$w0rD';                                     // Jade
const someOtherPlaintextPassword = 'not_bacon';                                   // Jade

router.get('/', (req, res) => {                                                   // Inge
  res.render('signup1');
});

router.post('/', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {                                                 // Inge
  req.session.user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };
  res.redirect('signup2');
})
});

module.exports = router;
