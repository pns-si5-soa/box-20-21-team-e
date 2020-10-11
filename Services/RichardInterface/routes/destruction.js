const express = require('express');

const rocketDestructionRouter = express.Router();
const rocketDestructionController = require('../controllers/destruction');

/**
 * Ask for the poll and ask for rocket destruction if GO
 */
rocketDestructionRouter.route('/rocketDestruction').get(async (req, res) => {
    try {
        res.json(await rocketDestructionController.setDestruction());
    } catch (err) {
        next (err);
    }
});

module.exports = rocketDestructionRouter;