const got = require('got');
const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('data/db.json')
const db = low(adapter)
const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'BlueOriginX',
    brokers: ['kafka:9092']
})


db.defaults({ telemetries: [] ,payloadInformation:{}}) //Création de la BD
    .write()



const getPayloadInformation = async () => {

    const payloadInformation = async() =>{
        const response = await got(`${process.env.CLIENT_ADDR}/getPayloadInformation`)
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
    }
    //La rocket est split
    const message = db.get('payloadInformation').value()
    const order = {}
    order.order = "TRAJCHANGE"
    order.futurSpeed = message.FutureSpeed
    order.futurAngle = message.FutureAngle
    await sendToRocket(order) //On envoie les informations du payload à la rocket
    await payloadInPlace()

    return "Payload at place"
}

const payloadInPlace = async() =>{
    let atPlace = false
    await getRocketData()
    while (!atPlace) {
        await new Promise(r => setTimeout(r, 5000));
        atPlace = isAtPlace()
        console.log(atPlace)
    }
    await sendToMissionCommander()
    return "Payload is in place"
}



const getRocketData = async() => {
    const consumer = kafka.consumer({ groupId: 'Payload' })
    await consumer.connect()
    await consumer.subscribe({ topic: "RocketData", fromBeginning: false })
    await consumer.run({
        eachMessage:async ({message}) => {
            let rocketData = JSON.parse(message.value.toString())
            console.log("MESSAGE: " + message.value.toString())
            switch (rocketData.status) {
                case "FAIL":
                    console.log("Telemetry : MISSION FAILED !")
                    await consumer.stop()
                    return "Telemetry ended"
                case "SUCCESS":
                    console.log("Telemetry : MISSION SUCCESSFUL !")
                    await consumer.stop()
                    return "Telemetry ended"
                case "LAUNCH":
                    db.get('telemetries').push(rocketData).write()
                    break;
            }
        }
    })



}

function isSplit(){ //Verifie si il y a la ligne Split : 1 dans telemetry
    const last = (db.get('telemetries').size().value())-1
    const lastTelemetry = db.get(`telemetries[${last}]`).value()
    return lastTelemetry.split === 1 //Si il y a au moins une valeur
}

function isAtPlace(){ //Verifie si le payload est à la bonne vitesse et angle
    const payloadInformation = db.get('payloadInformation').value()
    const last = (db.get('telemetries').size().value())-1
    const lastTelemetry = db.get(`telemetries[${last}]`).value()

    return lastTelemetry.secondStage.velocity === payloadInformation.FutureSpeed && lastTelemetry.angle === payloadInformation.secondStage.FutureAngle
}

const sendToRocket = async (order) => {
    const {body} = await got.post(`${process.env.ROCKET_ADDR}/order`, {
        json: {
            order: order.order,
            futurSpeed:order.futurSpeed,
            futurAngle:order.futurAngle
        },
        responseType: 'json'
    });
    return body
};

const sendToMissionCommander = async () => {
    const {body} = await got.post(`${process.env.MISSION_COMMANDER_INTERFACE_ADDR}/payloadStatus`, {
        json: {
            payloadInPlace: 1
        },
        responseType: 'json'
    });
    return body


};



module.exports = {
    sendPayloadInformationToRocket
};