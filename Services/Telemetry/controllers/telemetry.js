const got = require('got');
const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'BlueOriginX',
    brokers: ['kafka:9092']
})
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json')
const db = low(adapter)

db.defaults({ rocket: []}).write()
let continueStoring = false
function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s*1000));
}

async function storeRocketData () {
    try {
        response = await got(`${process.env.ROCKET_ADDR}/data`);
        rocketData = JSON.parse(response.body)
        db.get('rocket').push(rocketData).write()

        while(1) {
            console.log(`Telemetry : ${JSON.stringify(rocketData)}`);

            await sleep(2);

            response = await got(`${process.env.ROCKET_ADDR}/data`);

            rocketData = JSON.parse(response.body)

            switch (rocketData.status){
                case "FAIL":
                    console.log("Telemetry : MISSION FAILED !")
                    db.get('rocket').push("MISSION FAILED !").write()
                    return "Telemetry ended"
                case "SUCCESS":
                    console.log("Telemetry : MISSION SUCCESSFUL !")
                    db.get('rocket').push("MISSION SUCCESSFUL !").write()
                    return "Telemetry ended"
                case "LAUNCH":
                    db.get('rocket').push(rocketData).write()
                    break;
            }
        }

        
    } catch (err) {
        console.error(err);
    }
}

async function startTelemetryKafka() {
    continueStoring = true
    const consumer = kafka.consumer({ groupId: 'TelemetryService' })
    await consumer.connect()
    await consumer.subscribe({ topic: "RocketData", fromBeginning: true })
    await consumer.run({
        eachMessage: async ({message}) => {
            console.log("MESSAGE: " + message.value.toString())
            let rocketData = JSON.parse(message.value.toString())
            switch (rocketData.status){
                case "FAIL":
                    console.log("Telemetry : MISSION FAILED !")
                    db.get('rocket').push("MISSION FAILED !").write()
                    await consumer.stop()
                    return "Telemetry ended"
                case "SUCCESS":
                    console.log("Telemetry : MISSION SUCCESSFUL !")
                    db.get('rocket').push("MISSION SUCCESSFUL !").write()
                    await consumer.stop()
                    return "Telemetry ended"
                case "LAUNCH":
                    db.get('rocket').push(rocketData).write()
                    break;
            }
        },

    })
}

const startTelemetry = async () => {
    try {
        storeRocketData();
        return "Telemetry started store data"
    } catch (err) {
        console.error(err);
    }
}

const stopTelemetry = async () => {
    try {
        return "TODO"
    } catch (err) {
        console.error(err);
    }
}

const resetTelemetry = async () => {
    try {
        const reset = db.set('rocket', []).write();
        return reset;
    } catch (err) {
        console.error(err);
    }
}

const getRocketData = async () => {
    try {
        const last = (db.get('rocket').size().value())-1;
        const res = db.get(`rocket[${last}]`).value();
        return res;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getRocketData,
    stopTelemetry,
    resetTelemetry,
    startTelemetry,
    startTelemetryKafka
};