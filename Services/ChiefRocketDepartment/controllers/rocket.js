const got = require('got');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms*1000));
}

async function waitFirstTankIsEmpty () {
    let firstStageTank = 100;
    console.log("ChiefRocketDepartment : Waiting for first stage tank equal to 0")
    while (firstStageTank != 0){
        let response = await got('http://localhost:4007/rocketData')
        firstStageTank = JSON.parse(JSON.parse(response.body)).firstStageTankPercentage
        console.log(firstStageTank)
        await sleep(1);
    }
    await postSplitOrder();
    return "First tank empty"
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

module.exports = {
    getStatus,
    postOrder
};