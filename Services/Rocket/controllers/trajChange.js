const rocketData = require('../data').rocketData;

var futurAngle = 0;
var futurSpeed = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms*1000));
}

async function changeTrajAsync() {
    while (1){
        while(rocketData.velocity != futurSpeed || rocketData.angle != futurAngle){
            await sleep(1);
    
            if (rocketData.velocity > futurSpeed){
                if (rocketData.velocity - 5 > futurSpeed){
                    rocketData.velocity = rocketData.velocity - 5;
                } else {
                    rocketData.velocity = futurSpeed;
                }
            } else if (rocketData.velocity < futurSpeed){
                if (rocketData.velocity + 5 < futurSpeed){
                    rocketData.velocity = rocketData.velocity + 5;
                } else {
                    rocketData.velocity = futurSpeed;
                }
            }
    
            if (rocketData.angle > futurAngle){
                if (rocketData.angle - 5 > futurAngle){
                    rocketData.angle = rocketData.angle - 5;
                } else {
                    rocketData.angle = futurAngle;
                }
            } else if (rocketData.angle < futurAngle){
                if (rocketData.angle + 5 < futurAngle){
                    rocketData.angle = rocketData.angle + 5;
                } else {
                    rocketData.angle = futurAngle;
                }
            }
        }

        await sleep(1);
    }


    inProcess = false;
}

function change(speed, angle) {
    try {
        console.log("rocket : changement de trajectoire : ", angle, " et/ou de vitesse : ", speed);

        if (speed != null){
            futurSpeed = speed;
        }

        if (angle != null){
            futurAngle = angle;
        }

        return "TRAJCHANGE";
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    change,
    changeTrajAsync
};