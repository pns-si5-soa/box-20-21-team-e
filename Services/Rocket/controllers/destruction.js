const rocketData = require('../data').rocketData;

const destruction = async () => {
    try {
        if (rocketData.destruction == 0){
            console.log("rocket : Rocket Split !")
            rocketData.destruction = 1;
            return "DESTRUCTION";
        } else {
            console.log("rocket : ordre de destruction la rocket alors qu elle est deja destruction")
            return "ALREADY DESTRUCTED";
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    destruction
};