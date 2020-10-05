const got = require('got');
const fs = require('fs');
const readLastLines = require('read-last-lines');

const storeRocketData = async (stream) => {
    try {
        const response = await got('http://localhost:4001/data'); // The rocket
        stream.write(response.body + "\n");
    } catch (err) {
        console.error(err);
    }
};

// -----

const startTelemetry = async () => {
    try {
        let stream = fs.createWriteStream("data/rocketData.txt", {flags:'a'});
        while (1){
            await new Promise(r => setTimeout(r, 2000));
            storeRocketData(stream)
        }
    } catch (err) {
        console.error(err);
    }
}

const getRocketData = async () => {
    try {
        // let stream = fs.createWriteStream("data/rocketData.txt", {flags:'a'});
        // const response = await got('http://localhost:4001/data'); // The rocket
        // stream.write(response.body + "\n");
        return readLastLines.read('data/rocketData.txt', 1).then((lines) => { return lines; });
        // return JSON.parse(response.body);
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getRocketData,
    startTelemetry
};