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

module.exports = payloadRouter;