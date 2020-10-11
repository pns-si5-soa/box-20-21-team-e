const express = require('express');

const publicRouter = express.Router();
const rocketLaunchRoute = require('./routes/rocketLaunch');
const rocketDestructionRoute = require('./routes/destruction');

publicRouter.use('/', rocketLaunchRoute);
publicRouter.use('/', rocketDestructionRoute);

module.exports = publicRouter;