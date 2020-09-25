const express = require('express');

const orderRouter = express.Router();
const launchController = require('../controllers/launch');

/**
 * Get all modules statics infos
 */
orderRouter.route('/').post(async (req, res) => {
    try {
        switch (req.body.order){
            case "LAUNCH":
                res.json(await launchController.launch());
                break;
            default:
                res.json("Commande inconnue");
        }
        
    } catch (err) {
        next (err);
    }
});

module.exports = orderRouter;