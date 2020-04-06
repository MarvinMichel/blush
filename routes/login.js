/* Marvin */
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/feed',
    failureRedirect: '/login'
  })(req, res, next);
});

module.exports = router;
