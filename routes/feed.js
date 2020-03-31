const express = require('express');
const router = express.Router();
const server = require('../server');

let profiles = [];
const renderProfiles = (userID) => {
  server.Users.findOne({ _id: userID }, async () => {
    profiles = await server.Users.find({
      'profile.age': preferences.age,
      'profile.gender': preferences.gender,
      'profile.pets': preferences.pets,
      'profile.smoke': preferences.smoke,
      'profile.kids': preferences.kids
    });
  });
};

router.get('/', (req, res) => {
  res.render('feed');
});

router.post('/', (req, res) => {
  res.render('feed');
});

module.exports = router;