const express = require('express');

const publicRouter = express.Router();
const askingForRLRoute = require('./routes/askingForRL');

publicRouter.use('/askingForRL', askingForRLRoute);

module.exports = publicRouter;