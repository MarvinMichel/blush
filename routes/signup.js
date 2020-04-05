const express = require('express');                                               // Marvin
const router = express.Router();                                                  // Marvin
const bodyParser = require('body-parser');                                        // Marvin
const urlencodedParser = bodyParser.urlencoded({ extended: true });               // Marvin
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const server = require('../server');                                              // Marvin

// Convert birthday to age                                                        // Marvin
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

router.get('/', async (req, res) => {                                                   // Inge
  res.render('signup');
});

router.post('/', urlencodedParser, parser.single('file'), (req, res) => {
  const age = getAge(new Date(req.body.birthday));
  server.createUser(
    req.session.user.email,
    req.session.user.password,
    req.session.user.firstName,
    req.session.user.lastName,
    age,
    req.body.gender,
    req.file.url
  );
  res.redirect('feed');
});

module.exports = router;
