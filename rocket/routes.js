const express = require('express');

const publicRouter = express.Router();
const stateRoute = require('./routes/state');
const launchRoute = require('./routes/launch');

publicRouter.use('/state', stateRoute);
publicRouter.use('/launch', launchRoute);

module.exports = publicRouter;