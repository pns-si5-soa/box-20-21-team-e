const express = require('express');

const telemetryRouter = express.Router();
const telemetryController = require('../controllers/telemetry');

/**
 * Start telemetry
 */
telemetryRouter.route('/start').get(async (req, res) => {
    try {
        res.json(await telemetryController.startTelemetry());
    } catch (err) {
        next (err);
    }
});

/**
 * Start telemetry
 */
telemetryRouter.route('/stop').get(async (req, res) => {
    try {
        res.json(await telemetryController.stopTelemetry());
    } catch (err) {
        next (err);
    }
});

/**
 * Start telemetry
 */
telemetryRouter.route('/reset').get(async (req, res) => {
    try {
        res.json(await telemetryController.resetTelemetry());
    } catch (err) {
        next (err);
    }
});

/**
 * Get rocket data
 */
telemetryRouter.route('/rocketData').get(async (req, res) => {
    try {
        res.json(await telemetryController.getRocketData());
    } catch (err) {
        next (err);
    }
});

module.exports = telemetryRouter;