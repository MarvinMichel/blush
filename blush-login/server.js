const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const mongoose = require('mongoose');
const passport = require('passport');    // Inge
require('dotenv').config();

// Connect to database trough Mongoose
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Create Mongoose connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app
  .set('view engine', 'ejs')
  .set('views', 'views')
  .use(express.static(__dirname + '/public'))
  .use(passport.initialize())                    // Inge
  .use(passport.session())                       // Inge
  .use('/', require('./routes/index'))
  .use('/feed', require('./routes/feed'))
  .get('/login', (req, res) => res.render('index_register_login.ejs'))        // Inge
  .get('/signup', (req, res) => res.render('index_temp.ejs'))
  .post('/signup', signupToMakeProfile)
  .post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    })
  .listen(port, () => console.log(`Server is running on localhost:${port}`));

// Inge //Function om de data van het signup form in de database op te slaan en te redirecten naar het maken van een profiel
function signupToMakeProfile(req, res){
    res.render('index_register_profile.ejs')
}

exports.urlencodedParser = urlencodedParser;
