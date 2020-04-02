const express = require('express');
const router = express.Router();
const server = require('../server');

let profiles = [];
// const renderProfiles = async (userID) => {
//   const user = server.Users.findById(userID);
//   if (user.preferences) {
//     profiles = await server.Users.find({
//       'profile.age': user.preferences.age,
//       'profile.gender': user.preferences.gender,
//       'profile.pets': user.preferences.pets,
//       'profile.smoke': user.preferences.smoke,
//       'profile.kids': user.preferences.kids
//     });
//   } else {
//     profiles = await server.Users.find();
//   }
// };

router.get('/', async (req, res) => {
  // profiles = await server.Users.find();
  res.render('feed.ejs', { profiles });
});

router.post('/', (req, res) => {
  res.render('feed');
});

module.exports = router;
