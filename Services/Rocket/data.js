class Data {
    constructor(time, firstStageTankPercentage, secondStageTankPercentage, velocity, angle, split, launch, landed, parachute){
        this.time = time;
        this.firstStageTankPercentage = firstStageTankPercentage;
        this.secondStageTankPercentage = secondStageTankPercentage;
        this.velocity = velocity;
        this.angle = angle;
        this.split = split;
        this.launch = launch;
        this.landed = landed;
        this.parachute = parachute;
    }
}

let rocketData = new Data(0, 100, 100, 0, 0, 0, 0, 0, 0);

module.exports = {
    rocketData
};