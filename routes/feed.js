const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/oath');
const Users = require('./Schemas/users');
const Matches = require('./Schemas/matches');

let profiles = [];

// Made by Marvin
const renderProfiles = (user) => {
  if (user.preferences.gender) {
    return Users.find({
      _id: { $ne: user.id },
      "profile.gender": user.preferences.gender
      // ,
      // "profile.age": user.prefrences.age,
      // "profile.pets": user.prefrences.pets,
      // "profile.smoke": user.prefrences.smoke,
      // "profile.kids": user.prefrences.kids
    });
  } else {
    return Users.find({ _id: { $ne: user.id } });
  }
}

router.get('/', ensureAuthenticated, async (req, res) => {
  profiles = await renderProfiles(req.user);
  res.render('feed', { profiles: profiles, user: req.user });
});

// Post function made by Marvin
router.post('/', ensureAuthenticated, async (req, res) => {
  if (req.body.like === "true") {
    console.log(req.body.id);
    console.log("inserted into array");
    await Users.findOneAndUpdate({ _id: req.user.id }, { $push: { likes: req.body.id } });
    const likedUser = await Users.findById(req.body.id);
    if (likedUser.likes.length > 0) {
      for (let el of likedUser.likes) {
        if (el === req.user.id) {
          Matches.create({
            user1: req.user.id,
            user2: likedUser._id,
            messages: []
          });

          // Show match notification

          console.log("je hebt een match");
          return;
        };
      };
    };
  } else
  // if statement made by Jade
  if (req.body.dislike === "true") {
    console.log(req.body.id);
    console.log("removed from array");
    await Users.findOneAndUpdate({ _id: req.user.id }, { $pull: { likes: req.body.id } });
  };
});

// Function made by Jade, stores filter preferences in db
router.post('/filter', ensureAuthenticated, (req, res) => {
  Users.findOneAndUpdate(
    { _id: req.user.id },
    {
      preferences: {
        gender: req.body.gender,
        age: req.body.age,
        distance: req.body.distance,
        smoke: req.body.smoke,
        kids: req.body.kids,
        length: req.body.length
      }
    },
    (async (err) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect('/feed');
      }
    }));
});

module.exports = router;
