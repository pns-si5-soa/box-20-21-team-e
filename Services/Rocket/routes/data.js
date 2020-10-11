const express = require('express');

const dataRouter = express.Router();
const dataController = require('../controllers/data');

/**
 * Get all modules statics infos
 */
dataRouter.route('/').get(async (req, res) => {
    //console.log("rocket : recoie une requete get avec la route /data"); //DEBAT à voir plus tard : je trouve peux pertinent ce console.log
    try {
        res.json(await dataController.getData());
    } catch (err) {
        next (err);
    }
});

module.exports = dataRouter;