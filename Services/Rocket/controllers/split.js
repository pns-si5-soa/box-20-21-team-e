const rocketData = require('../data').rocketData;

const split = async () => {
    try {
        if (rocketData.split == 0){
            console.log("rocket : Rocket Split !")
            rocketData.split = 1;
            return "SPLIT";
        } else {
            console.log("rocket : ordre de split la rocket alors qu elle est deja split")
            return "ALREADY SPLIT";
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    split
};