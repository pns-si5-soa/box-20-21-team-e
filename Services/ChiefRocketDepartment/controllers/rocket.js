const got = require('got');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms*1000));
}

async function waitFirstTankIsEmpty () {
    let firstStageTank = 100;
    console.log("ChiefRocketDepartment : Waiting for first stage tank equal to 0")
    while (firstStageTank >= 20){
        let response = await got('http://localhost:4007/rocketData')
        firstStageTank = JSON.parse(response.body).firstStageTankPercentage
        await sleep(1);
    }
    await postSplitOrder();
    console.log("First tank empty")
    return "First tank empty"
}

async function waitMaxQ () {
    let time = 0
    let angle = 0
    console.log("ChiefRocketDepartment : Waiting for maxQ")
    while (time <= 10){
        let response = await got('http://localhost:4007/rocketData')
        time = JSON.parse(response.body).time
        angle = JSON.parse(response.body).angle
        await sleep(1);
    }
    await postMaxQ(angle);
    console.log("MaxQ atteint, on ralenti")
    return "MaxQ atteint"
}

const getStatus = async () => {
    try {
        const response = await got('http://localhost:4001/status'); // The rocket
        let body = response.body;
        if (body == "\"GO\""){
            return "GO";
        } else {
            return "NO GO";
        }
    } catch (err) {
        console.error(err);
    }
};

const postOrder = async (req) => {
    try {
        switch (req.body.order){
            case "LAUNCH":
                const postLaunchOrderRes = postLaunchOrder()
                return postLaunchOrderRes;
                break;
            case "SPLIT":
                const splitOrderRes = postSplitOrder();
                return splitOrderRes;
                break;
            case "DESTRUCTION":
                const destructionOrderRes = postDestructionOrder();
                return destructionOrderRes;
                break;
            default:
                res.json("Unknown request");
        }
    } catch (err) {
        console.error(err);
    }
};


const postLaunchOrder = async () => {
    try {
        const {body} = await got.post("http://localhost:4001/order", {
            json: {
                order: 'LAUNCH'
            },
            responseType: 'json'
        });
        waitFirstTankIsEmpty();
        waitMaxQ();
        return body;
    } catch (err) {
        console.error(err);
    }
};

const postMaxQ = async (angle) => {
    try {
        const {body} = await got.post("http://localhost:4001/order", {
            json: {
                order: 'TRAJCHANGE',
                "futurSpeed": 30,
                "futurAngle": angle
            },
            responseType: 'json'
        });
        return body;
    } catch (err) {
        console.error(err);
    }
};

const postSplitOrder = async () => {
    try {
        const {body} = await got.post("http://localhost:4001/order", {
            json: {
                order: 'SPLIT'
            },
            responseType: 'json'
        });
        return body;
    } catch (err) {
        console.error(err);
    }
};
const postDestructionOrder = async () => {
    try {
        const {body} = await got.post("http://localhost:4001/order", {
            json: {
                order: 'DESTRUCTION'
            },
            responseType: 'json'
        });
        return body;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getStatus,
    postOrder
};