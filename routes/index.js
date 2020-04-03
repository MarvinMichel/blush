const express = require('express');
const router = express.Router();
// const multer  = require('multer');                                                // Inge
// const slug = require('slug');                                                     // Inge
// const session = require('express-session');                                       // Inge
// const upload = multer({dest:'static/upload/'});                                   // Inge

router.get('/', (req, res) => {                                                   // Inge
  res.render('index');
});

router.post('/', (req, res) => {                                                 // Inge
  res.redirect('signup');
});

// router.post('/', upload.single('cover'), (req, res) => {                      // Inge post session- work in progress
//   const id = slug(req.body.username).toLowerCase();
//   req.session.user = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password:req.body.password,
// };
//   res.render('signup');
// });

module.exports = router;
