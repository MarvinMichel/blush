const express = require('express');
const router = express.Router();
const server = require('../server');
const { ensureAuthenticated } = require('../config/oath');
const Users = require('./Schemas/users');

let profiles = [];
const renderProfiles = (user) => Users.find({ _id: { $ne: user.id } });


router.get('/', ensureAuthenticated, async (req, res) => {
  profiles = await renderProfiles(req.user);
  res.render('feed', { profiles: profiles });
});


// Function made by Jade. Function puts preferences in database
router.post('/', (req, res) => {
  const id = server.ObjectId('5e88a6f27a795bf6d07f694c');
  console.log(id);
  Users.findOneAndUpdate(
    { _id: id },
    {
      preferences: {
        gender: req.body.gender,
        age: req.body.age,
        distance: req.body.distance,
        smoke: req.body.smoke,
        kids: req.body.kids,
        height: req.body.height
      }
    },
    ((err) => {
      if (err) {
        res.send(err);
      } else {
        console.log('preferences zijn succesvol in database (veranderd)');
        res.render('feed');
      }
    }));
});

module.exports = router;
