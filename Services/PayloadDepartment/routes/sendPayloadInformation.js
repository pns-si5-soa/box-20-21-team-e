const express = require('express');

const payloadRouter = express.Router();
const payloadController = require('../controllers/sendPayloadInformation');

/**
 * Start Payload
 */
payloadRouter.route('/').get(async (req, res) => {
    try {
        res.json(await payloadController.sendPayloadInformationToRocket());
    } catch (err) {
        console.error(err)
    }
});

/**
 * Reset Payload
 */
payloadRouter.route('/reset').get(async (req, res) => {
    try {
        res.json(await payloadController.resetTelemetry());
    } catch (err) {
        console.error(err);
    }
});

module.exports = payloadRouter;