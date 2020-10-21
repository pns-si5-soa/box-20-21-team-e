const express = require('express');
const data = require('../data');

const orderRouter = express.Router();
const launchController = require('../controllers/launch');
const trajChangeController = require('../controllers/trajChange');

/**
 * Get all modules statics infos
 */
orderRouter.route('/').post(async (req, res) => {
    try {
        switch (req.body.order){
            case "LAUNCH":
                console.log("rocket : recoie l'ordre via une requete post de lancer la fusee");
                res.json(launchController.launch());
                break;
            case "TRAJCHANGE":
                console.log("rocket : recoie l'ordre via une requete post de changer la trajectoire de la fusee");
                res.json(trajChangeController.change(req.body.futurSpeed, req.body.futurAngle));
                break;
            case "FAIL":
                data.missionFailed = true;
                break;
            default:
                console.log("rocket : recoie un ordre inconnu");
                res.json("Commande inconnue");
        }
    } catch (err) {
        console.error(err);
    }
});

module.exports = orderRouter;