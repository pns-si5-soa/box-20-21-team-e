const express = require('express');

const publicRouter = express.Router();
const weatherRoute = require('./routes/weather');

publicRouter.use('/weather',weatherRoute);

module.exports = publicRouter;