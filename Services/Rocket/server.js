const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const dotenv = require('dotenv');

const got = require('got');

const PORT = 4001;

const dotenvConfig = dotenv.config()
if (dotenvConfig.error) {
  throw dotenvConfig.error
}

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});