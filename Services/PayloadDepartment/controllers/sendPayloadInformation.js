const got = require('got');
const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('data/db.json')
const db = low(adapter)

db.defaults({ telemetries: [] ,payloadInformation:{}}) //Création de la BD
    .write()



const getPayloadInformation = async () => {

    const payloadInformation = async() =>{
        const response = await got('http://localhost:4009/getPayloadInformation')
        return response.body
    }
    let infos = JSON.parse(JSON.parse(await payloadInformation()))
    console.log(infos)
    db.set('payloadInformation.Traj',infos.Traj)
        .set('payloadInformation.FutureSpeed',infos.FutureSpeed)
        .set('payloadInformation.FutureAngle',infos.FutureAngle)
        .write()

};

const sendPayloadInformationToRocket = async () => {

    await getPayloadInformation() //Récupère les informations du payload
    let telemetry = (await getTelemetry())
    while (!isSplit(telemetry)){ //Tant que la rocket n'est pas split, on redemande si elle est split
        await new Promise(r => setTimeout(r, 2000));
        telemetry = (await getTelemetry()).valueOf()
        console.log("Telemetry:"+ telemetry)
    }
    //La rocket est split
    const message = db.get('payloadInformation').value()
    const order = {}
    order.order = "TRAJCHANGE"
    order.futurSpeed = message.FutureSpeed
    order.futurAngle = message.FutureAngle
    const sended = await sendToRocket(order) //On envoie les informations du payload à la rocket
    return sended
}


const getTelemetry = async() => {
    const response = await got('http://localhost:4007/rocketData')
    const telemetry = JSON.parse(response.body)
    console.log(telemetry.velocity)
    /*randInt = Math.floor(Math.random() * Math.floor(2));//TODO: Supprimer ce bloc car c'est un mock
    let response = JSON.parse("Time :"+new Date().toLocaleString()+"\n"+
        "TankPourcentage : 99\n" +
        "Vitesse : 22\n" +
        "Angle : 79\n" +
        "Split : "+randInt)*/

    db.get('telemetries')
        //.push({time: telemetry.time,velocity: telemetry.velocity, angle: telemetry.angle,split: telemetry.split})
        .push(telemetry)
        .write()
    return telemetry
}

function isSplit(){ //Verifie si il y a la ligne Split : 1 dans telemetry
    const telemetries = db.get('telemetries')
        .filter({split: 1})
        .value()
    return telemetries.length >=1 //Si il y a au moins une valeur
}

const sendToRocket = async (order) => {
    console.log(order)
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