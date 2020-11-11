const express = require('express');

const publicRouter = express.Router();
const webcastingRoute = require('./routes/webcasting');

publicRouter.use('/', webcastingRoute);

module.exports = publicRouter;