const rocketData = require('../data').rocketData;
const logic = require('./logic');
const trajChangeController = require('./trajChange');
const maxQController = require('./maxQ');
const splitController = require('./split');

function launch() {
    try {
        if (rocketData.launch == 0){
            console.log("Rocket : rocket launch !")
            rocketData.launch = 1;

            //Initialise toutes les fonctions asynchrones
            logic.tankEmptying();
            splitController.splitWaiting();
            logic.timeCounter();
            maxQController.maxQWaiting();
            trajChangeController.changeTrajAsync();

            trajChangeController.change(40, 0);

            return "LAUNCHED";
        } else {
            console.log("Rocket : ordre de lancer la rocket alors qu elle est deja lancee")
            return "ALREADY LAUNCHED";
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    launch
};