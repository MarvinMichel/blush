/* Marvin */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const server = require('../server');
const bcrypt = require('bcrypt');                                                 // Jade
const saltRounds = 10;                                                            // Jade

// Convert birthday to age
const getAge = (birth) => {
  const today = new Date();
  return Math.floor((today - birth) / (365.25 * 24 * 60 * 60 * 1000));
};

// Configure Cloudinary for image uploads
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Define Cloudinary storage
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'profilePics',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
});

const parser = multer({ storage: storage });

router.get('/', async (req, res) => {
  res.render('signup2');
});

// CreatuUser function made by Marvin
// Hashing function made by Jade
router.post('/', parser.single('file'), (req, res) => {
  const age = getAge(new Date(req.body.birthday));
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.session.user.password, salt, (err, hash) => {
      req.session.user.password = hash;

      server.createUser(
        req.session.user.email,
        req.session.user.password,
        req.session.user.firstName,
        req.session.user.lastName,
        age,
        req.body.gender,
        req.file.url
      );
      req.flash('succes', 'Profile created! You can now login.');
      res.redirect('login');
    })
  })
})

module.exports = router;
