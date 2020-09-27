const express = require('express');

const publicRouter = express.Router();
const weatherRoute = require('./routes/weather');

publicRouter.use('/',weatherRoute);

module.exports = publicRouter;