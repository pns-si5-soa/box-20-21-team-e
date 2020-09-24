const got = require('got');

const elonResponse=async () => {
    try {
        const response = await got('http://localhost:4002/status'); // The rocket
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
const toryResponse=async () => {
    try {
        const response = await got('http://localhost:4004/status'); //weather chief
        const body = response.body;
        if (body === "OK"){
            return "OK";
        } else {
            return " NOT OK";
        }
    } catch (err) {
        console.error(err);
    }

};
const RichardResponse='OK' //reponse de richard

const getResponse = () => { //reponse pour lancer 
        try {
            return "OK";
        } catch (err) {
            console.error(err);
        }
    
       
    
};

module.exports = {
    getResponse
};