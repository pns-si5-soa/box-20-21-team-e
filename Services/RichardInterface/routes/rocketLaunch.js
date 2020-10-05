const express = require('express');

const rocketLaunchRouter = express.Router();
const rocketLaunchController = require('../controllers/rocketLaunch');

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

module.exports = rocketLaunchRouter;