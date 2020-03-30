const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const mongoose = require('mongoose');
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
  .use('/', require('./routes/index'))
  .use('/feed', require('./routes/feed'))
  .listen(port, () => console.log(`Server is running on localhost:${port}`));

exports.urlencodedParser = urlencodedParser;