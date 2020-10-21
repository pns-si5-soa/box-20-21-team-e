const got = require('got');

const rocketData = require('../data').rocketData;
const trajChangeController = require('./trajChange');
const timeOut = require('../timeOut');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms*1000));
}

async function maxQWaiting () {
    console.log("Rocket : Waiting for maxQ...")

    while (rocketData.time <= 10){
        await sleep(0.5);
    }

    maxQ();
}

async function maxQ() {
    try {
        console.log("Rocket : MaxQ atteint, on ralenti")
        trajChangeController.change(30, null);

        await informRequest();

        return "MAXQ";
    } catch (err) {
        console.error(err);
    }
};

const informRequest = async () => {
    try {
        timeOut.requestLaunch();
        const {body} = await got.post(`${process.env.CHIEF_ROCKET_DEPARTMENT_ADDR}/rocketInfo`, {
            json: {
                info: 'MAXQ'
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
    maxQWaiting,
    maxQ
};