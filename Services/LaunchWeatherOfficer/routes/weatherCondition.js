const express = require('express');

const weatherRouter = express.Router();
const weatherController = require('../controllers/weatherCondition');

/**
 * Get all modules statics infos
 */
weatherRouter.route('/').get(async (req, res) => {
    try {
        res.json(await weatherController.getWeatherCondition());
    } catch (err) {
        next (err);
    }
});

module.exports = weatherRouter;