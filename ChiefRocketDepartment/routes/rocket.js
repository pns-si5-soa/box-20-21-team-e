const express = require('express');

const rocketRouter = express.Router();
const rocketController = require('../controllers/rocket');

/**
 * Get all modules statics infos
 */
rocketRouter.route('/').get(async (req, res) => {
    try {
        res.json(await rocketController.getStatus());
    } catch (err) {
        next (err);
    }
});

module.exports = rocketRouter;