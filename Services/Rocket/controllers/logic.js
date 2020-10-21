const data = require('../data');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms*1000));
}

async function tankEmptying() {
    console.log("Rocket : Le reservoir commence a se vider...")

    while(data.rocketData.firstStageTankPercentage > 0 && data.missionFailed == false){
        await sleep(1);
        data.rocketData.firstStageTankPercentage -= 5;
    }

    while(data.rocketData.secondStageTankPercentage > 0 && data.missionFailed == false){
        await sleep(1);
        data.rocketData.secondStageTankPercentage -= 5;
    }
}


async function timeCounter() {//Permet d avoir une idée chronologique de l avancer de la fusee
    while(data.missionFailed == false && data.missionSuccessful == false){
        await sleep(1);
        data.rocketData.time += 1;
    }
}

module.exports = {
    timeCounter,
    tankEmptying
};