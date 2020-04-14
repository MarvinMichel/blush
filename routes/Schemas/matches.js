const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let matchSchema = new Schema({
  user1: String,
  user2: String,
  messages: Array
}, {
  collection: 'matches'
});

const Matches = mongoose.model('matches', matchSchema, 'matches');

module.exports = Matches;
