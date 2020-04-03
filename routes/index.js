const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {                                               // Inge
  res.render('index');
});

module.exports = router;
