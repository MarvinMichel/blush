const express = require('express');
const router = express.Router();

router.get('/filter-feed', (req, res) => {
  res.redirect('/feed');
});

module.exports = router;
