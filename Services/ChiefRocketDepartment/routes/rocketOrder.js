const express = require('express');

const rocketOrderRouter = express.Router();
const rocketOrderController = require('../controllers/rocketOrder');

/**
 * Post order to rocket
 */
rocketOrderRouter.route('/order').post(async (req, res) => {
    try {
        res.json(await rocketOrderController.postOrder(req));
    } catch (err) {
        next (err);
    }
});

module.exports = rocketOrderRouter;