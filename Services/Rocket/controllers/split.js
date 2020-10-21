const got = require('got');

const rocketData = require('../data').rocketData;
const timeOut = require('../timeOut');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms*1000));
}

async function splitWaiting() {
    console.log("Rocket : Waiting for split...")

    while(rocketData.firstStageTankPercentage > 10){
        await sleep(0.3);
    }

    console.log("Rocket : Il reste moins de 10% de carburant dans la firstStage")

    split();
}

async function split() {
    try {
        if (rocketData.split == 0){
            console.log("rocket : Rocket Split !")
            rocketData.split = 1;

            await informRequest();

            return "SPLIT";
        } else {
            console.log("rocket : ordre de split la rocket alors qu elle est deja split")
            return "ALREADY SPLIT";
        }
    } catch (err) {
        console.error(err);
    }
};

const informRequest = async () => {
    try {
        timeOut.requestLaunch();
        const {body} = await got.post(`${process.env.CHIEF_ROCKET_DEPARTMENT_ADDR}/rocketInfo`, {
            json: {
                info: 'SPLIT'
            },
            responseType: 'json'
        });
        timeOut.responseReceive();
        return body;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    splitWaiting,
    split
};