
const getPayloadInformation = async () => {
    const got = require('got');
    const payloadInformation = async() =>{
        const response = await got('http://localhost:4009/getPayloadInformation')
        return response.body
    }
    return JSON.parse(await payloadInformation())
};

const sendPayloadInformationToRocket = async () => {
    const payloadInformation = await getPayloadInformation() //Récupère les informations du payload
    let telemetry = (await getTelemetrie()).valueOf()
    while (!isSplit(telemetry)){ //Tant que la rocket n'est pas split, on redemande si elle est split
        await new Promise(r => setTimeout(r, 2000));
        telemetry = (await getTelemetrie()).valueOf()
        console.log("Telemetry:"+ telemetry)
    }
    //La rocket est split
    const message = JSON.parse(payloadInformation)
    const order = {}
    order.order = "TRAJCHANGE"
    order.futurSpeed = message.FutureSpeed
    order.futurAngle = message.FutureAngle
    const sended = await sendToRocket(order) //On envoie les informations du payload à la rocket
    return sended
}

const getTelemetrie = async () =>{
    const got = require('got');
    const getTelemetry = async() =>{
        const response = await got('http://localhost:4007/rocketData') //TODO: Mettre le port et le chemin du service télémétrie
        return response.body;
        /*randInt = Math.floor(Math.random() * Math.floor(2));//TODO: Supprimer ce bloc car c'est un mock
        let response = "Time :"+new Date().toLocaleString()+"\n"+
            "TankPourcentage : 99\n" +
            "Vitesse : 22\n" +
            "Angle : 79\n" +
            "Split : "+randInt
        return response*/
    }
    return (await getTelemetry()).valueOf()
}
function isSplit(telemetry){ //Verifie si il y a la ligne Split : 1 dans telemetry
    const regex = RegExp("Split : 1") //REGEX: Vérifie si Split est à 1 TODO à changer avec le bon format du body renvoyé par télémétrie
    return regex.test(telemetry)
}

const sendToRocket = async (order) => {
    const got = require('got');
    const {body} = await got.post("http://localhost:4001/order", {
        json: {
            order: order.order,
            futurSpeed:order.futurSpeed,
            futurAngle:order.futurAngle
        },
        responseType: 'json'
    });
    return body


};



module.exports = {
    sendPayloadInformationToRocket
};