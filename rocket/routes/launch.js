const express = require('express');

const launchRouter = express.Router();
const launchController = require('../controllers/launch');

/**
 * Get all modules statics infos
 */
launchRouter.route('/').get(async (req, res) => {
    try {
        res.json(await launchController.launch());
    } catch (err) {
        next (err);
    }
});

module.exports = launchRouter;