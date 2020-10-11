const got = require('got');

const setDestruction = async () => {
    try {
        // destruction service
       
            // if go from destruction service, launch order to Elon
            const {body} = await got.post("http://localhost:4002/order", {
                json: {
                    order: 'DESTRUCTION'
                },
                responseType: 'json'
            });
            return body;
        
    } catch (err) {
        console.error(err);
    }    
};

module.exports = {
    setDestruction
};