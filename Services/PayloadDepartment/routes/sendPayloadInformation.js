const express = require('express');

const payloadRouter = express.Router();
const payloadController = require('../controllers/sendPayloadInformation');

/**
 * Get all modules statics infos
 */
payloadRouter.route('/').get(async (req, res) => {
    try {
        const bla = await payloadController.sendPayloadInformationToRocket()
        await new Promise(r => setTimeout(r, 1000));
        res.json(bla);
    } catch (err) {
        console.error(err)
        //next (err);
    }
});

module.exports = payloadRouter;