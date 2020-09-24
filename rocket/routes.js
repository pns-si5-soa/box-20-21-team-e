const express = require('express');

const publicRouter = express.Router();
const statusRoute = require('./routes/status');
const orderRoute = require('./routes/order');

publicRouter.use('/status', statusRoute);
publicRouter.use('/order', orderRoute);

module.exports = publicRouter;