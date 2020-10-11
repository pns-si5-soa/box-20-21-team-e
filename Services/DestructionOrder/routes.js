const express = require('express');

const publicRouter = express.Router();
const destructionRoute = require('./routes/destruction');

publicRouter.use('/destruction', destructionRoute);

module.exports = publicRouter;