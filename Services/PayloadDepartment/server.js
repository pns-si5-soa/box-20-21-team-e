const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const routes = require('./routes');
const dotenv = require('dotenv');

const PORT = 4008;

const dotenvConfig = dotenv.config()
if (dotenvConfig.error) {
  throw dotenvConfig.error
}

const adapter = new fileSync('db.json')
const db = low(adapter)

db.defaults({ telemetries: [] ,payloadInformation:{}}) //Création de la BD
    .write()

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
