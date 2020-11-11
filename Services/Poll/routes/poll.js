const express = require('express');

const pollRouter = express.Router();
const pollController = require('../controllers/poll');

/**
 * Get all modules statics infos
 */
pollRouter.route('/').get(async (req, res,next) => {
    try {
        res.json(await pollController.getResponse());
    } catch (err) {
        next (err);
    }
});

module.exports = pollRouter;