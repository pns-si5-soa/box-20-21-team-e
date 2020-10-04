const rocketData = require('../data').rocketData;

const split = async () => {
    try {
        if (rocketData.splited == 0){
            console.log("Rocket Splited !")
            rocketData.splited = 1;
            return "SPLITED";
        } else {
            console.log("Rocket Already Splited !")
            return "ALREADY SPLITED";
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    split
};