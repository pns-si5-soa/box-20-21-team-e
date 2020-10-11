const got = require('got');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('data/db.json')
const db = low(adapter)

db.defaults({ rocket: []}).write()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms*1000));
}

async function storeRocketData () {
    try {
        let missionInProgress = true;
        let response = await got('http://localhost:4001/data');
        while(missionInProgress) {
            rocketData = JSON.parse(response.body)
            db.get('rocket').push(rocketData).write()
            response = await got('http://localhost:4001/data'); // The rocket
            await sleep(2);
        }
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

const getRocketData = async () => {
    try {
        const last = (db.get('rocket').size().value())-1
        const res = db.get(`rocket[${last}]`).value()
        return res;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getRocketData,
    startTelemetry
};