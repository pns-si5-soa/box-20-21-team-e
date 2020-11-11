const express = require('express');

const publicRouter = express.Router();
const weatherRoute = require('./routes/weatherCondition');

publicRouter.use('/',weatherRoute);

module.exports = publicRouter;