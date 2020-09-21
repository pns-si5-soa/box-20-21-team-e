const express = require('express');

const publicRouter = express.Router();
const helloRoute = require('./routes/hello');

publicRouter.use('/hello', helloRoute);

module.exports = publicRouter;