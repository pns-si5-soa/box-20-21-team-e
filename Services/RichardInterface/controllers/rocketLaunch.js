const got = require('got');

const setPoll = async () => {
    try {
        const response = await got(`${process.env.POLL_ADDR}/poll`); // Poll service
        if (response.body == "\"GO\"") {
            // if go from Poll service, launch order to Elon
            const {body} = await got.post(`${process.env.CHIEF_ROCKET_DEPARTMENT_ADDR}/order`, {
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