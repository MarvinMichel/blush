require('dotenv').config();                                                       // Marvin
const express = require('express');                                               // Marvin
const app = express();                                                            // Marvin
const port = 8000;                                                                // Marvin
const session = require('express-session');                                       // Marvin
const mongoose = require('mongoose');                                             // Marvin
const passport = require('passport');
const flash = require('express-flash');
const bcrypt = require('bcrypt');                                                 // Jade
const saltRounds = 10;                                                            // Jade
const myPlaintextPassword = 's0/\/\P4$$w0rD';                                     // Jade
const someOtherPlaintextPassword = 'not_bacon';                                   // Jade
require('./passport-config')(passport);


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

// // Create user model
// const userSchema = require('./routes/Schemas/users');                             // Marvin
// const Users = mongoose.model('users', userSchema, 'users');                       // Marvin

// Function to create user instance in database
const createUser = (email, password, firstName, lastName, age, gender, picture) => {       // Marvin
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
  .use('/', require('./routes/index'))                                            // Inge
  .use('/feed', require('./routes/feed'))                                         // Marvin
  .use('/signup', require('./routes/signup'))                                     // Inge
  .use('/login', require('./routes/login'))                                       // Inge
  .listen(port, () => console.log(`Server is running on localhost:${port}`));     // Marvin

// Export variables and arrays
exports.db = db;
// exports.Users = Users;

// Export functions
exports.createUser = createUser;
