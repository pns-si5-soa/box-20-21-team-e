const express = require('express');

const rocketInfoRouter = express.Router();
const rocketInfoController = require('../controllers/rocketInfo');


/**
 * La rocket peut prevenir qu elle s'est split ou qu elle a atteint maxQ ou meme qu elle n a plus de carburant
 */
rocketInfoRouter.route('/rocketInfo').post(async (req, res) => {
    try {
        //rocketInfoController.postInfo(req);
        //await sleep(5); //a mettre a la place si on veut fail grace au timeOut

        res.json(await rocketInfoController.postInfo(req));
    } catch (err) {
        next (err);
    }
});

module.exports = rocketInfoRouter;