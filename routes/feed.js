const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/oath');
const Users = require('./Schemas/users');

let profiles = [];

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

router.post('/', ensureAuthenticated, async (req, res) => {
  if (req.body.like === "true") {
    console.log(req.body.id)
    await Users.findOneAndUpdate({ _id: req.user.id }, { $push: { likes: req.body.id } });
  }
});

router.post('/filter', (req, res) => {
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
