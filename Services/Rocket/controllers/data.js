const rocketData = require('../data').rocketData;

const getData = async () => {
    try {
        console.log("rocket : retourne les datas de la fusee");
        return rocketData;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getData
};