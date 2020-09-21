const express = require('express');

const weatherRouter = express.Router();
const weatherController = require('../controllers/weather');

/**
 * Get all modules statics infos
 */
weatherRouter.route('/').get(async (req, res) => {
    try {
        res.json(await weatherController.getWeather());
    } catch (err) {
        next (err);
    }
});

module.exports = weatherRouter;