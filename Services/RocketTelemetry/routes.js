const express = require('express');

const publicRouter = express.Router();
const rocketInfoRoute = require('./routes/rocketInfo');

publicRouter.use('/', rocketInfoRoute);
module.exports = publicRouter;