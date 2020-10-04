const express = require('express');

const publicRouter = express.Router();
const telemetryRoute = require('./routes/telemetry');

publicRouter.use('/', telemetryRoute);

module.exports = publicRouter;