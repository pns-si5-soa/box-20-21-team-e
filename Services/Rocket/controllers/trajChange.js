const rocketData = require('../data').rocketData;

var inProcess = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms*1000));
}

async function changeTrajAsync(futurAngle, futurSpeed) {
    inProcess = true;

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

    inProcess = false;
}

const change = async (speed, angle) => {
    try {

        if (inProcess == true){
            console.log("rocket : Vous ne pouvez pas changer de trajectoire car elle la rocket n a pas encore fini son dernier changement de trajectoire");
            return "WAIT THE END OF THE TRAJCHANGE";
        } else {
            console.log("rocket : changement de trajectoire : ", angle, " et/ou de vitesse : ", speed);
            changeTrajAsync(angle, speed);
            return "TRAJCHANGE";
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    change
};