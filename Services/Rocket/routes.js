const express = require('express');

const publicRouter = express.Router();
const statusRoute = require('./routes/status');
const orderRoute = require('./routes/order');
const dataRoute = require('./routes/data');
const successRoute = require('./routes/success');

publicRouter.use('/status', statusRoute);
publicRouter.use('/order', orderRoute);
publicRouter.use('/data', dataRoute);
publicRouter.use('/success', successRoute);


module.exports = publicRouter;