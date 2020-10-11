const express = require('express');

const orderRouter = express.Router();
const launchController = require('../controllers/launch');
const splitController = require('../controllers/split');
const destructionController = require('../controllers/destruction');
const trajChangeController = require('../controllers/trajChange');

/**
 * Get all modules statics infos
 */
orderRouter.route('/').post(async (req, res) => {
    try {
        switch (req.body.order){
            case "LAUNCH":
                console.log("rocket : recoie l'ordre via une requete post de lancer la fusee");
                res.json(await launchController.launch());
                break;
            case "DESTRUCTION":
                console.log("rocket : recoie l'ordre via une requete post de destruction");
                res.json(await destructionController.destruction());
                break;
            case "SPLIT":
                console.log("rocket : recoie l'ordre via une requete post de split la fusee");
                res.json(await splitController.split());
                break;
            
            case "TRAJCHANGE":
                console.log("rocket : recoie l'ordre via une requete post de changer la trajectoire de la fusee");
                res.json(await trajChangeController.change(req.body.futurSpeed, req.body.futurAngle));
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