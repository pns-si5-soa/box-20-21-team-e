const got = require('got');

const postOrder = async (req) => {
    try {
        switch (req.body.order){
            case "LAUNCH":
                const postLaunchOrderRes = postLaunchOrder()
                return postLaunchOrderRes;
                break;
            default:
                return "Unknown request";
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
    postOrder
};