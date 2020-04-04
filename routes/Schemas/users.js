const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: String,
  password: String,
  profile: {
    name: {
      firstName: String,
      lastName: String
    },
    age: Number,
    gender: String,
    picture: String,
    pets: String,
    smoke: Boolean,
    kids: Boolean,
  },
  preferences: [{
    age: Number,
    gender: String,
    pets: String,
    smoke: Boolean,
    kids: Boolean
  }],
  likes: Array
}, {
  collection: 'users'
});

module.exports = userSchema;