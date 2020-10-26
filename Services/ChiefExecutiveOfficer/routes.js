const express = require('express');

const publicRouter = express.Router();
const boosterRoute = require('./routes/booster');

publicRouter.use('/', boosterRoute);

module.exports = publicRouter;