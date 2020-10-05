const express = require('express');

const publicRouter = express.Router();
const rocketLaunchRoute = require('./routes/rocketLaunch');

publicRouter.use('/', rocketLaunchRoute);

module.exports = publicRouter;