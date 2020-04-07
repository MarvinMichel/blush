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
  preferences: {
    gender: String,
    age: Number,
    distance: Number,
    smoke: String,
    kids: String,
    hight: Number
  },
  likes: Array
}, {
  collection: 'users'
});

const Users = mongoose.model('users', userSchema, 'users');

module.exports = Users;
