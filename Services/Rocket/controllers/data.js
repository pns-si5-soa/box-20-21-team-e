const rocketData = require('../data').rocketData;

const getData = async () => {
    try {
        console.log("Rocket : return rocket data");
        return rocketData;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getData
};