const mongoose = require('mongoose');

let Schema = mongoose.Schema();
let userSchema = new Schema({
  name: {
    firstName: String,
    lastName: String
  },
  age: Number,
  preferences: Array,
  likes: Array
}, {
  collection: 'users'
});

module.exports = userSchema;