const express = require('express');

const publicRouter = express.Router();
const pollRoute = require('./routes/poll');

publicRouter.use('/poll', pollRoute);

module.exports = publicRouter;