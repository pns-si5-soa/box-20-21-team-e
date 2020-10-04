const got = require('got');
const fs = require('fs');

const storeRocketData = async () => {
    try {
        const response = await got('http://localhost:4001/data'); // The rocket
        
    } catch (err) {
        console.error(err);
    }
};

const getRocketData = async () => {
    try {
        
    } catch (err) {
        console.error(err);
    }
};

const startTelemetry = async () => {
    try {
        while(1){
            setTimeout(storeRocketData, 2000);
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getStatus,
    postLaunchOrder
};