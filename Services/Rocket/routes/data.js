const express = require('express');

const dataRouter = express.Router();
const dataController = require('../controllers/data');
const data = require('../data');

/**
 * Get all modules statics infos
 */
dataRouter.route('/').get(async (req, res) => {
    if (data.missionFailed == true){
        try {
            res.json({status : "FAIL"});
        } catch (err) {
            next (err);
        }
    } else if (data.missionSuccessful == true){
        try {
            res.json({status : "SUCCESS"});
        } catch (err) {
            next (err);
        }
    } else {
        try {
            res.json(await dataController.getData());
        } catch (err) {
            next (err);
        }
    }
});

module.exports = dataRouter;