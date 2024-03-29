const express = require('express');

const statusRouter = express.Router();
const statusController = require('../controllers/status');

/**
 * Get all modules statics infos
 */
statusRouter.route('/').get(async (req, res) => {
    console.log("rocket : recoie une requete get avec la route /status");
    try {
        res.json(await statusController.getStatus());
    } catch (err) {
        next (err);
    }
});

module.exports = statusRouter;