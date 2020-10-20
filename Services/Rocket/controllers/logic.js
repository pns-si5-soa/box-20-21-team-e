const rocketData = require('../data').rocketData;

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


async function timeCounter() {//Permet d avoir une idée chronologique de l avancer de la fusee
    while(1){
        await sleep(1);
        rocketData.time += 1;
    }
}

module.exports = {
    timeCounter,
    tankEmptying
};