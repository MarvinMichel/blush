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

module.exports = router;
