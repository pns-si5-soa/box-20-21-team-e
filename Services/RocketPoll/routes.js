const express = require('express');

const publicRouter = express.Router();
const rocketPoll = require('./routes/poll');

publicRouter.use('/', rocketPoll);

module.exports = publicRouter;