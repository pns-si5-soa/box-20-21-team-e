const express = require('express');

const boosterRouter = express.Router();
const boosterController = require('../controllers/booster');

/**
 * Post order to booster
 */
boosterRouter.route('/order').post(async (req, res) => {
    try {
        res.json(await boosterController.postOrder(req));
    } catch (err) {
        next (err);
    }
});

module.exports = boosterRouter;