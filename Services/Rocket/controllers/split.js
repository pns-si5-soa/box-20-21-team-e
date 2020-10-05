const rocketData = require('../data').rocketData;

const split = async () => {
    try {
        if (rocketData.split == 0){
            console.log("Rocket Split !")
            rocketData.split = 1;
            return "SPLIT";
        } else {
            console.log("Rocket Already Split !")
            return "ALREADY SPLIT";
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    split
};