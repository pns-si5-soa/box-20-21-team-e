const express = require('express');

const orderRouter = express.Router();
const launchController = require('../controllers/launch');
const splitController = require('../controllers/split');
const trajChangeController = require('../controllers/trajChange');

/**
 * Get all modules statics infos
 */
orderRouter.route('/').post(async (req, res) => {
    try {
        switch (req.body.order){
            case "LAUNCH":
                res.json(await launchController.launch());
                break;
            case "SPLIT":
                res.json(await splitController.split());
                break;
            case "TRAJCHANGE":
                res.json(await trajChangeController.change(req.body.futurSpeed, req.body.futurAngle));
                break;
            default:
                res.json("Commande inconnue");
        }
    } catch (err) {
        console.error(err);
    }
});

module.exports = orderRouter;