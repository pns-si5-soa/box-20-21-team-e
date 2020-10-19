const got = require('got');

const getStatus = async () => {
    try {
        const response = await got(`${process.env.ROCKET_ADDR}/status`);
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
            default:
                res.json("Unknown request");
        }
    } catch (err) {
        console.error(err);
    }
};


const postLaunchOrder = async () => {
    try {
        const {body} = await got.post(`${process.env.ROCKET_ADDR}/order`, {
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

module.exports = {
    getStatus,
    postOrder
};