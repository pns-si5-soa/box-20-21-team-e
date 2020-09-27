const express = require('express');

const rocketRouter = express.Router();
const rocketController = require('../controllers/rocket');

/**
 * Get rocket status
 */
rocketRouter.route('/').get(async (req, res) => {
    try {
        res.json(await rocketController.getStatus());
    } catch (err) {
        next (err);
    }
});

/**
 * Post order to rocket
 */
rocketRouter.route('/').post(async (req, res) => {
    try {
        res.json(await rocketController.postLaunchOrder(req));
    } catch (err) {
        next (err);
    }
});

module.exports = rocketRouter;