const express = require('express');

const publicRouter = express.Router();
const payloadRoute = require('./routes/sendPayloadInformation');

publicRouter.use('/sendPayloadInformation',payloadRoute);

module.exports = publicRouter;