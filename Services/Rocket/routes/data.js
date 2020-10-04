const express = require('express');

const dataRouter = express.Router();
const dataController = require('../controllers/data');

/**
 * Get all modules statics infos
 */
dataRouter.route('/').get(async (req, res) => {
    try {
        res.json(await dataController.getData());
    } catch (err) {
        next (err);
    }
});

module.exports = dataRouter;