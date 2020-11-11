const express = require('express');

const rocketPollRouter = express.Router();
const rocketPollController = require('../controllers/poll');




/**
 * Get rocket data
 */
rocketPollRouter.route('/startKafka').get(async (req, res) => {
    try {
        res.json(await rocketPollController.listenTopicPoll());
    } catch (err) {
        next (err);
    }
});


module.exports = rocketPollRouter;