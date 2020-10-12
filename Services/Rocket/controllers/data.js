const rocketData = require('../data').rocketData;

const getData = async () => {
    try {
        console.log("Rocket : return rocket data");
        return {
            time: rocketData.time,
            split: rocketData.split,
            launch: rocketData.launch,
            missionSuccessful: rocketData.missionSuccessful,
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