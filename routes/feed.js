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

// functie die weer aangezet moet worden als GET gefixt is van regel 48 hieronder
// router.post('/', (req, res) => {
//   db.collection('filters').insertOne({
//     geslacht: req.body.geslacht,
//     leeftijd: req.body.leeftijd,
//     afstand: req.body.afstand,
//     roken: req.body.roken,
//     kinderen: req.body.kinderen,
//     lengte: req.body.lengte,
//   }, done)
//
//   function done(err, data) {
//     if (err) {
//       next(err)
//     } else {
//       res.redirect('/' + data.insertedId)
//     }
//   }
// });

// hoezo zegt ie cannot POST /filter-feed terwijl als ik '/' en action '/' doe kan ie wel posten. mis ik iets?
router.post('/', (req, res) => {
  res.render('feed');
});


module.exports = router;
