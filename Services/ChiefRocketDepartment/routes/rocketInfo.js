const express = require('express');

const rocketInfoRouter = express.Router();
const rocketInfoController = require('../controllers/rocketInfo');


/**
 * Get rocket status
 */
rocketInfoRouter.route('/status').get(async (req, res) => {
    try {
        res.json(await rocketInfoController.getStatus());
    } catch (err) {
        next (err);
    }
});

/**
 * La rocket peut prevenir qu elle s'est split ou qu elle a atteint maxQ ou meme qu elle n a plus de carburant
 */
rocketInfoRouter.route('/rocketInfo').post(async (req, res) => {
    try {
        res.json(await rocketInfoController.postInfo(req));
    } catch (err) {
        next (err);
    }
});

module.exports = rocketInfoRouter;