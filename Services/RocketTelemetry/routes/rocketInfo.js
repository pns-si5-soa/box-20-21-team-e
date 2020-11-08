const express = require('express');

const rocketInfoRouter = express.Router();
const rocketInfoController = require('../controllers/rocketInfo');




/**
 * Get rocket data
 */
rocketInfoRouter.route('/data').get(async (req, res) => {
    try {
        res.json(await rocketInfoController.getData());
    } catch (err) {
        next (err);
    }
});


module.exports = rocketInfoRouter;