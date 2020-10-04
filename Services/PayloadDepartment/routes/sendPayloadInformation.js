const express = require('express');

const payloadRouter = express.Router();
const payloadController = require('../controllers/sendPayloadInformation');

/**
 * Get all modules statics infos
 */
payloadRouter.route('/').get(async (req, res) => {
    try {
        res.json(await payloadController.sendPayloadInformationToRocket());
    } catch (err) {
        next (err);
    }
});

module.exports = payloadRouter;