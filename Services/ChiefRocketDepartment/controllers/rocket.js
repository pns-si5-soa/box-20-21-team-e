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
                return postLaunchOrder;
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
        return body;
    } catch (err) {
        console.error(err);
    }
};

const postSplitOrder = async () => {
    try {
        const response = await got('http://localhost:4007/rocketData')
        const firstStageTank = JSON.parse(response.body).firstStageTankPercentage
        if (firstStageTank == 0) {
            const {body} = await got.post("http://localhost:4001/order", {
                json: {
                    order: 'SPLIT'
                },
                responseType: 'json'
            });
            return body;
        }
        return "First Stage Tank not empty"
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getStatus,
    postOrder
};