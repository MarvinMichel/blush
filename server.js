// Setup modules
const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to database through Mongoose
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

// Create user model
const userSchema = require('./routes/Schemas/users');
const Users = mongoose.model('users', userSchema, 'users');

// Function to create user instance in database
const createUser = (firstName, lastName, age, email, password) => {
  Users.create({
    name: {
      firstName: firstName,
      lastName: lastName
    },
    age: age,
    email: email,
    password: password
  });
};

// Middleware
app
  .set('view engine', 'ejs')
  .set('views', 'views')
  .use(express.static(__dirname + '/public'))
  .use('/', require('./routes/index'))
  .use('/feed', require('./routes/feed'))
  .listen(port, () => console.log(`Server is running on localhost:${port}`));

// Export variables and arrays
exports.db = db;

// Export functions
exports.urlencodedParser = urlencodedParser;
exports.createUser = createUser;
