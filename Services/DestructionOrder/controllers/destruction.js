const got = require('got');


const getResponse = async () => { //reponse pour lancer 
    try {
       
        
            return "Emergency Destruction";
        
    } catch (err) {
        console.error(err);
    }    
};

module.exports = {
    getResponse
};