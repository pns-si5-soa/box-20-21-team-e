const rocketData = require('../data').rocketData;

const getData = async () => {
    try {
        console.log("Rocket : return rocket data");
        return {
            status: "LAUNCH",
            time: rocketData.time,
            split: rocketData.split,
            launch: rocketData.launch,
            firstStage: {
                tankPercentage: rocketData.firstStageTankPercentage,
                landed: rocketData.landed,
                parachute: rocketData.parachute
            },
            secondStage: {
                tankPercentage: rocketData.secondStageTankPercentage,
                velocity: rocketData.velocity,
                angle: rocketData.angle
            }
        };
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getData
};