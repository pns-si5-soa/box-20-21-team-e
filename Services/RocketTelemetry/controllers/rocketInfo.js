const got = require('got');
const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'BlueOriginX',
    brokers: ['kafka:9092']
})
let isProbing = false

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s*1000));
}

async function startProbLoop() {
    isProbing = true
    const producer = kafka.producer()
    await producer.connect()
    console.log("Start probing rocket")
    while (isProbing){
        const response = await got(`${process.env.ROCKET_ADDR}/data`);
        await producer.send({
            topic: 'RocketData',
            messages: [
                { value: response.body },
            ],
        })
        await sleep(2)
    }
    await producer.disconnect()
}

const startProb = async () => {
    try {
        startProbLoop();
        return "Rocket Telemetry started store data"
    } catch (err) {
        console.error(err);
    }
}


function stopProb() {
    isProbing = false
    console.log("End of probing rocket")
}

module.exports = {
    startProb,
    stopProb
};