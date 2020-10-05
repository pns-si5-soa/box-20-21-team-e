const got = require('got');

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
        const postSplitOrderRes = await postSplitOrder();
        return body;
    } catch (err) {
        console.error(err);
    }
};

const postSplitOrder = async () => {
    try {
        let firstStageTank = 100;
        while (firstStageTank != 0){
            console.log("Elon : Waiting for first stage tank equal to 0")
            await new Promise(r => setTimeout(r, 2000));
            let response = await got('http://localhost:4007/rocketData')
            firstStageTank = response.body
            console.log(response.body)
        }
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