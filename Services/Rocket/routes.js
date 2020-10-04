const express = require('express');

const publicRouter = express.Router();
const statusRoute = require('./routes/status');
const orderRoute = require('./routes/order');
const dataRoute = require('./routes/data');

publicRouter.use('/status', statusRoute);
publicRouter.use('/order', orderRoute);
publicRouter.use('/data', dataRoute);

module.exports = publicRouter;