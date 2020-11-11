const express = require('express');

const rocketInfoRouter = express.Router();
const rocketInfoController = require('../controllers/rocketInfo');




/**
 * Get rocket data
 */
rocketInfoRouter.route('/data').get(async (req, res) => {
    try {
        res.json(await rocketInfoController.getData());
    } catch (err) {
        next (err);
    }
});

rocketInfoRouter.route('/start').get(async(req, res, next) => {
    try {
        res.json(await rocketInfoController.startProb());
    } catch (err) {
        next (err);
    }
})

rocketInfoRouter.route('/stop').get((req, res, next) => {
    try {
        res.json(rocketInfoController.stopProb());
    } catch (err) {
        next (err);
    }
})

module.exports = rocketInfoRouter;