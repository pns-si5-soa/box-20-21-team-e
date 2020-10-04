const got = require('got');
const fs = require('fs');

const storeRocketData = async (stream) => {
    try {
        const response = await got('http://localhost:4001/data'); // The rocket
        stream.write(response.body + "\n");
        return 0;
    } catch (err) {
        console.error(err);
    }
};

// -----

const startTelemetry = async () => {
    try {
        let stream = fs.createWriteStream("data/rocketData.txt", {flags:'a'});
        while(1){
            setTimeout(storeRocketData, 10000, stream);
        }
    } catch (err) {
        console.error(err);
    }
}

const getRocketData = async () => {
    try {
        
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getRocketData,
    startTelemetry
};