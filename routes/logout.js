const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.logout();
  res.render('logout');
})

module.exports = router;