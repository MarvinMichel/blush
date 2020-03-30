const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    firstName: String,
    lastName: String
  },
  age: Number,
  gender: String,
  email: String,
  password: String,
  preferences: Array,
  likes: Array
}, {
  collection: 'users'
});

module.exports = userSchema;