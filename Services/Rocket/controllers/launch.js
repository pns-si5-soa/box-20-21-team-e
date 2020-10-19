const rocketData = require('../data').rocketData;
const trajChangeController = require('../controllers/trajChange');
const splitController = require('../controllers/split');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms*1000));
}

async function tankEmptying() {
    console.log("Rocket : Le reservoir commence a se vider...")

    while(rocketData.firstStageTankPercentage > 0){
        await sleep(1);
        rocketData.firstStageTankPercentage -= 5;
    }

    while(rocketData.secondStageTankPercentage > 0){
        await sleep(1);
        rocketData.secondStageTankPercentage -= 5;
    }
}

async function splitWaiting() {
    console.log("Rocket : Waiting for split...")

    while(rocketData.firstStageTankPercentage > 10){
        await sleep(0.3);
    }

    console.log("Rocket : Il reste moins de 10% de carburant dans la firstStage")

    splitController.split();
}

async function timeCounter() {//Permet d avoir une idée chronologique de l avancer de la fusee
    while(1){
        await sleep(1);
        rocketData.time += 1;
    }
}

async function maxQWaiting () {
    console.log("Rocket : Waiting for maxQ...")

    while (rocketData.time <= 10){
        await sleep(0.5);
    }

    console.log("MaxQ atteint, on ralenti")
    trajChangeController.change(30, null);

    return "MaxQ atteint"
}

function launch() {
    try {
        if (rocketData.launch == 0){
            console.log("Rocket : rocket launch !")
            rocketData.launch = 1;

            //Initialise toutes les fonctions asynchrones
            tankEmptying();
            splitWaiting();
            timeCounter();
            maxQWaiting();
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