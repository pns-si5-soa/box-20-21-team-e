const rocketData = require('../data').rocketData;

const destruction = async () => {
    try {
        if (rocketData.destruction == 0){
            console.log("rocket : Rocket Destroyed !")
            rocketData.destruction = 1;
            return "DESTRUCTION";
        } else {
            console.log("rocket : ordre de destruction la rocket alors qu elle est deja destruction")
            return "ALREADY DESTROYED";
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    destruction
};