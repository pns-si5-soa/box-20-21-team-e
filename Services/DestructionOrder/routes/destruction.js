const express = require('express');

const destructionRouter = express.Router();
const destructionController = require('../controllers/destruction');

/**
 * Get all modules statics infos
 */
destructionRouter.route('/').get(async (req, res) => {
    try {
        res.json(await destructionController.getResponse());
    } catch (err) {
        next (err);
    }
});

module.exports = destructionRouter;