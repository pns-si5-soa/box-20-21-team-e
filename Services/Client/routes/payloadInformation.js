const express = require('express');

const payloadRouter = express.Router();
const payloadController = require('../controllers/payloadInformation');

/**
 * Get all modules statics infos
 */
payloadRouter.route('/').get(async (req, res) => {
    try {
        res.json(await payloadController.getPayloadInformation());
    } catch (err) {
        next (err);
    }
});

module.exports = payloadRouter;