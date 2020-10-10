const rocketData = require('../data').rocketData;

const change = async (speed, angle) => {
    try {
        console.log("rocket : changement de trajectoire : ", angle, " et/ou de vitesse : ", speed);
        rocketData.vitess = speed;
        rocketData.angle = angle;
        return "TRAJCHANGE";
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    change
};