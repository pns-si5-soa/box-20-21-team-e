const got = require('got');

const getStatus = async () => {
    try {
        const response = await got('http://localhost:4001/status'); // The rocket
        const body = response.body;
        if (body === "OK"){
            return "OK";
        } else {
            return "NOT OK";
        }
    } catch (err) {
        console.error(err);
    }
};

const postLaunchOrder = async () => {
    try {
        // if go from Richard
        const {body} = await got.post("http://localhost:4001/order", {
            json: {
                order: 'LAUNCH'
            },
            responseType: 'json'
        });
        return body.data;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getStatus,
    postLaunchOrder
};