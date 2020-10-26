const express = require('express');

const rocketLaunchRouter = express.Router();
const rocketLaunchController = require('../controllers/rocketLaunch');
const payloadController = require('../controllers/payload')

/**
 * Ask for the poll and ask for rocket launch if GO
 */
rocketLaunchRouter.route('/rocketLaunch').get(async (req, res) => {
    try {
        res.json(await rocketLaunchController.setPoll());
    } catch (err) {
        next (err);
    }
});

rocketLaunchRouter.route('/payloadStatus').post(async (req, res) => {
    try {
        res.json(await payloadController.payloadStatus());
    } catch (err) {
        next (err);
    }
});

module.exports = rocketLaunchRouter;