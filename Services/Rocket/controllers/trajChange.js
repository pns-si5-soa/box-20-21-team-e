const rocketData = require('../data').rocketData;

const change = async (speed, angle) => {
    try {
        console.log("New traj : ", rocketData);
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