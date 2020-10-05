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

module.exports = {
    getStatus,
    postLaunchOrder
};