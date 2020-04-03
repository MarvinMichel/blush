const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {                                                  // Inge
  res.render('signup');
});

router.post('/', (req, res) => {
  console.log('De post werkt hier ook');                                               // Inge
  res.redirect('feed');
});

module.exports = router;
