const rocketData = require('../data').rocketData;

const getData = async () => {
    try {
        console.log("Return data : ", rocketData);
        return rocketData;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getData
};