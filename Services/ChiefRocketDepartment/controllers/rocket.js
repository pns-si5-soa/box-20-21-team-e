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
        const response = await got('http://localhost:4003/poll'); // Mission commander
        if (response.body == "GO") {
            // if go from Richard
            const {body} = await got.post("http://localhost:4001/order", {
                json: {
                    order: 'LAUNCH'
                },
                responseType: 'json'
            });
            return body.data;
        } else {
            return "NO GO"
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getStatus,
    postLaunchOrder
};