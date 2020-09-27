const express = require('express');

const weatherRouter = express.Router();
const weatherController = require('../controllers/weatherCondition');

/**
 * Get weather condition status
 */
weatherRouter.route('/status').get(async (req, res) => {
    try {
        res.json(await weatherController.getWeatherCondition());
    } catch (err) {
        next (err);
    }
});

module.exports = weatherRouter;