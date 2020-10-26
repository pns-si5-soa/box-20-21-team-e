const express = require('express');

const publicRouter = express.Router();
const rocketOrderRoute = require('./routes/rocketOrder');
const rocketInfoRoute = require('./routes/rocketInfo');
const successRoute = require('./routes/success');

publicRouter.use('/', rocketOrderRoute);
publicRouter.use('/', rocketInfoRoute);
publicRouter.use('/', successRoute);

module.exports = publicRouter;