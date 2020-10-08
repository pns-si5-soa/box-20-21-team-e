const rocketData = require('../data').rocketData;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms*1000));
}

async function tankEmptying() {
    while(rocketData.firstStageTankPercentage > 0){
        await sleep(1);
        rocketData.firstStageTankPercentage -= 5;
    }

    while(rocketData.secondStageTankPercentage > 0){
        await sleep(1);
        rocketData.secondStageTankPercentage -= 5;
    }
}

const launch = async () => {
    try {
        if (rocketData.launch == 0){
            console.log("Rocket Launched !")
            rocketData.launch = 1;
            tankEmptying();
            return "LAUNCHED";
        } else {
            console.log("Rocket Already Launched !")
            return "ALREADY LAUNCHED";
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    launch
};