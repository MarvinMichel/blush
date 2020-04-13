const express = require('express');
const router = express.Router();
const Users = require('./Schemas/users');
const { ensureAuthenticated } = require('../config/oath');

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('profile', { user: req.user });
});

// Function made by Jade, function puts more information about the user in the database
router.post('/', (req, res) => {
  console.log("goed hij doet het");
  Users.findOneAndUpdate(
    { _id: req.user.id },
    { profile : {
        name: {
          firstName: req.user.profile.name.firstName,
          lastName: req.user.profile.name.lastName
        },
        age: req.body.age,
        gender: req.body.gender,
        picture: req.user.profile.picture,
        place: req.body.place,
        about: req.body.about,

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
})

module.exports = router;
