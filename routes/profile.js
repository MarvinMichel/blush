const express = require('express');
const router = express.Router();
const Users = require('./Schemas/users');

router.get('/', (req, res) => {
  res.render('profile', { user: req.user });
});

// Function made by Jade, function puts more information about the user in the database
router.post('/', (req, res) => {
  console.log("goed hij doet het");
  Users.findOneAndUpdate(
    { _id: req.user.id },
      { profile : {
          name: {
            firstName: req.session.user.firstName,
            lastName: req.session.user.lastName
          },
          age: req.user.profile.age,
          gender: req.user.profile.gender,
          picture: req.user.profile.picture,
          place: req.user.profile.place,
          about: req.user.profile.about,
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
