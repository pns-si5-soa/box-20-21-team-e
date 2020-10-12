const got = require('got');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json')
const db = low(adapter)

db.defaults({ rocket: []}).write()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms*1000));
}

async function storeRocketData () {
    try {
        response = await got(`${process.env.ROCKET_ADDR}/data`);
        rocketData = JSON.parse(response.body)
        db.get('rocket').push(rocketData).write()

        while(rocketData.missionSuccessful == 0) {
            console.log(`Telemetry : ${JSON.stringify(rocketData)}`);

            await sleep(2);

            response = await got(`${process.env.ROCKET_ADDR}/data`);
            rocketData = JSON.parse(response.body)
            db.get('rocket').push(rocketData).write()
        }

        console.log("MISSION SUCCESSFUL !");

        return "Telemetry ended"
    } catch (err) {
        console.error(err);
    }
};

const startTelemetry = async () => {
    try {
        storeRocketData();
        return "Telemetry started store data"
    } catch (err) {
        console.error(err);
    }
}

const stopTelemetry = async () => {
    try {
        return "TODO"
    } catch (err) {
        console.error(err);
    }
}

const resetTelemetry = async () => {
    try {
        const reset = db.set('rocket', []).write();
        return reset;
    } catch (err) {
        console.error(err);
    }
}

const getRocketData = async () => {
    try {
        const last = (db.get('rocket').size().value())-1;
        const res = db.get(`rocket[${last}]`).value();
        return res;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getRocketData,
    stopTelemetry,
    resetTelemetry,
    startTelemetry
};