const got = require('got');

const getResponse = async () => { //reponse pour lancer 
    try {
       
            return "Asking for Rocket Launch!!";
       
    } catch (err) {
        console.error(err);
    }    
};

module.exports = {
    getResponse
};