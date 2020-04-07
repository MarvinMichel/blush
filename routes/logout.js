const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.logout();
  req.flash('succes', 'You have succesfully logged out!');
  res.redirect('/login');
})

module.exports = router;
