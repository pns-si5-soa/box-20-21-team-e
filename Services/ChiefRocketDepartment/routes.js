const express = require('express');

const publicRouter = express.Router();
const rocketRoute = require('./routes/rocket');
const successRoute = require('./routes/success');

publicRouter.use('/', rocketRoute);
publicRouter.use('/', successRoute);

module.exports = publicRouter;