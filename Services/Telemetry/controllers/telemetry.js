const got = require('got');
const fs = require('fs');
const readLastLines = require('read-last-lines');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms*1000));
}

async function storeRocketData (stream) {
    try {
        let missionInProgress = true;
        let response = await got('http://localhost:4001/data');
        while(missionInProgress) {
            stream.write(response.body + "\n");
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
        let stream = fs.createWriteStream("data/rocketData.txt", {flags:'a'});
        storeRocketData(stream);
        return "Telemetry started store data"
    } catch (err) {
        console.error(err);
    }
}

const getRocketData = async () => {
    try {
        const res = readLastLines.read('data/rocketData.txt', 1).then((lines) => { return lines; })
        return res;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getRocketData,
    startTelemetry
};