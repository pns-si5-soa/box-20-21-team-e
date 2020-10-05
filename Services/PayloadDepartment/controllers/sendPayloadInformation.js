
const getPayloadInformation = async () => {
    const got = require('got');
    const payloadInformation = async() =>{
        const response = await got('http://localhost:4011/getPayloadInformation')
        return response.body
    }
    return payloadInformation()
};

const sendPayloadInformationToRocket = async () => {
    const payloadInformation = await getPayloadInformation() //Récupère les informations du payload
    let telemetry = (await getTelemetrie()).valueOf()
    while (!isSplited(telemetry)){ //Tant que la rocket n'est pas split, on redemande si elle est split
        await new Promise(r => setTimeout(r, 2000));
        telemetry = (await getTelemetrie()).valueOf()
    }
    //La rocket est split
    const message = payloadInformation.valueOf()
    const sended = await sendToRocket(message) //On envoie les informations du payload à la rocket
    return sended
}

const getTelemetrie = async () =>{
    const got = require('got');
    const getTelemetry = async() =>{
        /*const response = await got('http://localhost:4011/CHANGEME') //TODO: Mettre le port et le chemin du service télémétrie
        return response.body;*/
        randInt = Math.floor(Math.random() * Math.floor(2));//TODO: Supprimer ce bloc car c'est un mock
        let response = "Time :"+new Date().toLocaleString()+"\n"+
            "TankPourcentage : 99\n" +
            "Vitesse : 22\n" +
            "Angle : 79\n" +
            "Splited : "+randInt
        return response
    }
    return (await getTelemetry()).valueOf()
}
function isSplited(telemetry){ //Verifie si il y a la ligne Splited : 1 dans telemetry
    const regex = RegExp("Splited : 1") //REGEX: Vérifie si Splited est à 1 TODO à changer avec le bon format du body renvoyé par télémétrie
    return regex.test(telemetry)
}

const sendToRocket = async (message) => {
    const got = require('got');
    //const {body} = await got.post("http://localhost:4001/CHANGEME",message); //TODO: Mettre le chemin pour le POST
    //return body
    return "Done"


};



module.exports = {
    sendPayloadInformationToRocket
};