const express = require('express');

const publicRouter = express.Router();
const rocketRoute = require('./routes/rocket');

publicRouter.use('/', rocketRoute);

module.exports = publicRouter;