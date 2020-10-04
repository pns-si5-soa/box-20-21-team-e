class Data {
    constructor(time, tankPourcentage, vitess, angle, splited){
        this.time = time;
        this.tankPourcentage = tankPourcentage;
        this.vitess = vitess;
        this.angle = angle;
        this.splited = splited;
    }
}

let rocketData = new Data(0, 100, 0, 0, 0);

module.exports = {
    rocketData
};