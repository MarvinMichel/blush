const express = require('express');
const router = express.Router();
const Users = require('./Schemas/users');

router.get('/', (req, res) => {
  res.render('profile', { user: req.user });
});


router.post('/', (req, res) => {
  console.log("goed hij doet het");
  Users.findOneAndUpdate(
    { _id: req.user.id },
    { $setOnInsert:
      { profile : {
        // name: {
        //   firstName: ,
        //   lastName: ,
        // },
        // age: ,
        // gender: ,
        // picture: ,
        smoke: req.body.smoke,
        kids: req.body.kids,
        length: req.body.length
      }
      }
    },
    (async (err) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect('/profile');
      }
    }));
  // res.render('profile', { user: req.user });
})

module.exports = router;
