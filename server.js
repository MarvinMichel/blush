require('dotenv').config();                                                       // Marvin
const express = require('express');                                               // Marvin
const app = express();                                                            // Marvin
const port = 8000;                                                                // Marvin
const bodyParser = require('body-parser');                                        // Marvin
const urlencodedParser = bodyParser.urlencoded({ extended: true });               // Marvin
const mongoose = require('mongoose');                                             // Marvin
const bcrypt = require('bcrypt');                                                 // Jade
const saltRounds = 10;                                                            // Jade
const myPlaintextPassword = 's0/\/\P4$$w0rD';                                     // Jade
const someOtherPlaintextPassword = 'not_bacon';                                   // Jade
const ObjectId = mongoose.Types.ObjectId;                                         // Jade
const passport = require('passport');                                             // Inge


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

// Create user model
const userSchema = require('./routes/Schemas/users');                             // Marvin
const Users = mongoose.model('users', userSchema, 'users');                       // Marvin

// Function to create user instance in database
const createUser = (email, password, firstName, lastName, age, gender) => {       // Marvin
  Users.create({
    email: email,
    password: password,
    profile: {
      name: {
        firstName: firstName,
        lastName: lastName
      },
      age: age,
      gender: gender
    }
  });
};

// Middleware
app
  .set('view engine', 'ejs')                                                      // Marvin
  .set('views', 'views')                                                          // Marvin
  .use(bodyParser.json())                                                         // Jade
  .use(bodyParser.urlencoded({ extended: true }))                                 // Jade
  .use(express.static(__dirname + '/public'))                                     // Marvin
  .use('/', require('./routes/index'))                                            // Inge
  .use('/feed', require('./routes/feed'))                                         // Inge
  .use('/signup', require('./routes/signup'))                                     // Inge
  .use('/login', require('./routes/login'))                                       // Inge
  .listen(port, () => console.log(`Server is running on localhost:${port}`));     // Marvin

// Export variables and arrays
exports.ObjectId = ObjectId;                                                      // Jade
exports.db = db;                                                                  // Marvin
exports.Users = Users;                                                            // Marvin

// Export functions
exports.urlencodedParser = urlencodedParser;                                      // Marvin
exports.createUser = createUser;                                                  // Marvin
