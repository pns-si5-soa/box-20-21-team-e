const express = require('express');

const publicRouter = express.Router();
const payloadRoute = require('./routes/payloadInformation');

publicRouter.use('/getPayloadInformation',payloadRoute);

module.exports = publicRouter;