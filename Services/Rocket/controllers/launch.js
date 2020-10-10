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
            console.log("rocket : rocket launched !")
            rocketData.launch = 1;
            console.log("rocket : le reservoir commence a se vider")
            tankEmptying();
            return "LAUNCHED";
        } else {
            console.log("rocket : ordre de lancer la rocket alors qu elle est deja lancee")
            return "ALREADY LAUNCHED";
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    launch
};