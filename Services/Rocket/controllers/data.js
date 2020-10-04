const ata = require('../data');

let myData = new ata.Data(0, 100, 0, 0, 0);

const getData = async () => {
    try {
        console.log("Return data : ", myData);
        return myData;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getData
};