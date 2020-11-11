const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'BlueOriginX',
    brokers: ['kafka:9092']
})





async function postInfo(req) {
    try {
        switch (req.body.info) {
            case "SPLIT":
                console.log("CRD : La rocket s est split");
                await sendMissionStatus("Rocket Split")
                return "OK";
            case "MAXQ":
                console.log("CRD : La rocket a atteint MAXQ");
                await sendMissionStatus("Max Q")
                return "OK";
            default:
                console.log("CRD : Info inconnu recue");
                return "Unknown info : " + req.body.info;
        }
    } catch (err) {
        console.error(err);
    }
}

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
    postInfo
};