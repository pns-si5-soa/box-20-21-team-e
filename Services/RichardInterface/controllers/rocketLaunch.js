const got = require('got');

const setPoll = async () => {
    try {
        const response = await got('http://localhost:4003/poll'); // Poll service
        if (response.body == "\"GO\"") {
            // if go from Poll service, launch order to Elon
            const {body} = await got.post("http://localhost:4002/order", {
                json: {
                    order: 'LAUNCH'
                },
                responseType: 'json'
            });
            return body;
        } else {
            return "NO GO"
        }
    } catch (err) {
        console.error(err);
    }    
};

module.exports = {
    setPoll
};