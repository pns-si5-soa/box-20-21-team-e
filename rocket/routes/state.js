const express = require('express');

const stateRouter = express.Router();
const stateController = require('../controllers/state');

/**
 * Get all modules statics infos
 */
stateRouter.route('/').get(async (req, res) => {
    try {
        res.json(await stateController.getState());
    } catch (err) {
        next (err);
    }
});

module.exports = stateRouter;