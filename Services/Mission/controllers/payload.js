const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'BlueOriginX',
    brokers: ['kafka:9092']
})
const payloadStatus = async () => {
    await sendMissionStatus("Payload delivered")
    console.log("MISSION SUCCESS, PAYLOAD IN PLACE")
};

const sendMissionStatus = async (message)=>{
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
        topic: 'MissionStatus',
        messages: [
            { value: message },
        ],
    })

    await producer.disconnect()
}

module.exports = {
    payloadStatus
};