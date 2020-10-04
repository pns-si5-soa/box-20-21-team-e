const express = require('express');

const askingForRLRouter = express.Router();
const askingForRLController = require('../controllers/askingForRL');

/**
 * Get all modules statics infos
 */
askingForRLRouter.route('/').get(async (req, res) => {
    try {
        res.json(await askingForRLController.getResponse());
    } catch (err) {
        next (err);
    }
});

module.exports = askingForRLRouter;