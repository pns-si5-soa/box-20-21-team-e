const express = require('express');

const successRouter = express.Router();
const successController = require('../controllers/success');


/**
 * Get the success of the launch
 */
successRouter.route('/success').get(async (req, res) => {
    try {
        res.json(await successController.success());
    } catch (err) {
        next (err);
    }
});

module.exports = successRouter;