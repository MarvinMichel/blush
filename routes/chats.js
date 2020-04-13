const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/oath');

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('chats', { user: req.user });
});

module.exports = router;
