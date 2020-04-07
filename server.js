require('dotenv').config();                                                       // Marvin
const express = require('express');                                               // Marvin
const app = express();                                                            // Marvin
const port = process.env.PORT || 8000;                                            // Inge
const session = require('express-session');                                       // Marvin
const mongoose = require('mongoose');                                             // Marvin
const passport = require('passport');
const flash = require('express-flash');
const bcrypt = require('bcrypt');                                                 // Jade
const saltRounds = 10;                                                            // Jade
const myPlaintextPassword = 's0/\/\P4$$w0rD';                                     // Jade
const someOtherPlaintextPassword = 'not_bacon';                                   // Jade

require('./config/passport-config')(passport);
const ObjectId = mongoose.Types.ObjectId;                                         // Jade



// Connect to database trough Mongoose
mongoose.connect(                                                                 // Marvin
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Create Mongoose connection
const db = mongoose.connection;                                                   // Marvin
db.on('error', console.error.bind(console, 'connection error:'));

// Import user model
const Users = require('./routes/Schemas/users');                                   // Marvin

// Function to create user instance in database
const createUser = (email, password, firstName, lastName, age, gender, picture) => {
  Users.create({
    email,
    password,
    profile: {
      name: {
        firstName,
        lastName
      },
      age,
      gender,
      picture
    }
  });
};

// Middleware
app
  .set('view engine', 'ejs')                                                      // Marvin
  .set('views', 'views')                                                          // Marvin
  .use(express.urlencoded({ extended: true }))                                    // Jade
  .use(express.static(__dirname + '/public'))                                     // Marvin
  .use(express.urlencoded({ extended: true }))                                    // Marvin
  .use(session({                                                                  // Marvin
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
  }))
  .use(passport.initialize())                                                     // Marvin
  .use(passport.session())                                                        // Marvin
  .use(flash())
  .use((req, res, next) => {
    res.locals.succes = req.flash('succes');
    res.locals.error = req.flash('error');
    next();
  })
  .use('/', require('./routes/index'))                                            // Inge
  .use('/feed', require('./routes/feed'))                                         // Marvin
  .use('/signup1', require('./routes/signup1'))                                   // Inge
  .use('/signup2', require('./routes/signup2'))                                   // Inge
  .use('/login', require('./routes/login'))                                       // Inge
  .use('/chats', require('./routes/chats'))                                       // Inge
  .use('/logout', require('./routes/logout'))
  .listen(port, () => console.log(`Starting server at ${port}`));                 // Inge

// Export variables
exports.ObjectId = ObjectId;                                                      // Jade
exports.db = db;                                                                  // Marvin

// Export functions
exports.createUser = createUser;                                                  // Marvin
