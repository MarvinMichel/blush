const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {                                                  // Inge
  res.render('login');
});

module.exports = router;
