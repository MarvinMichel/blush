const express = require('express');
const app = express();
const port = 8000;
require('dotenv').config();

app
  .set('view engine', 'ejs')
  .set('views', 'views')
  .use(express.static(__dirname + '/public'))
  .listen(port, () => console.log(`Server is running on localhost:${port}`));