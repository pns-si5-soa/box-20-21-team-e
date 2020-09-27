const got = require('got');

const elonResponse = async () => {
    try {
        const response = await got('http://localhost:4002/status'); // The rocket
        return response.body;
    } catch (err) {
        console.error(err);
    }
};

const toryResponse = async () => {
    try {
        const response = await got('http://localhost:4004/status'); //weather chief
        return response.body;
    } catch (err) {
        console.error(err);
    }
};

const getResponse = async () => { //reponse pour lancer 
    try {
        const tory = await toryResponse();
        const elon = await elonResponse();
        const richard = 'GO'; //reponse de richard
        if (tory === "\"GO\"" && elon === "\"GO\"" && richard === "GO") {
            return "GO";
        } else {
            return "NO GO";
        }
    } catch (err) {
        console.error(err);
    }    
};

module.exports = {
    getResponse
};