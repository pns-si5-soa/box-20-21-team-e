const express = require('express');

const webcastingRouter = express.Router();
const webcastingController = require('../controllers/webcasting');

/**
 * Start telemetry
 */
webcastingRouter.route('/start').get(async (req, res) => {
    try {
        res.json(await webcastingController.startWebcasting());
    } catch (err) {
        next (err);
    }
});

/**
 * Start telemetry
 */
webcastingRouter.route('/stop').get(async (req, res) => {
    try {
        res.json(await webcastingController.stopWebcasting());
    } catch (err) {
        next (err);
    }
});


module.exports = webcastingRouter;