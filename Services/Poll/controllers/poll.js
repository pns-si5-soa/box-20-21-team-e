const got = require('got');

const CRDResponse = async () => {
    try {
        const response = await got(`${process.env.CHIEF_ROCKET_DEPARTMENT_ADDR}/status`); // The rocket
        return response.body;
    } catch (err) {
        console.error(err);
    }
};

const LWOResponse = async () => {
    try {
        const response = await got(`${process.env.WEATHER_DEPARTMENT_ADDR}/status`); //weather chief
        return response.body;
    } catch (err) {
        console.error(err);
    }
};

const getResponse = async () => { //reponse pour lancer 
    try {
        const LWO = await LWOResponse();
        const CRD = await CRDResponse();
        const mission_commander = 'GO'; //reponse de mission_commander
        if (LWO === "\"GO\"" && CRD === "\"GO\"" && mission_commander === "GO") {
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