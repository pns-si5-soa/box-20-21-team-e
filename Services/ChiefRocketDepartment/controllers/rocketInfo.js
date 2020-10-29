const got = require('got');
const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'BlueOriginX',
    brokers: ['kafka:9092']
})

const listenTopicPoll = async  () => {
    const consumer = kafka.consumer({ groupId: 'pollRocketMember' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'Poll', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            await postRocketStatus();

            // MAJ d'un boolean indiquant si le sender est OK
        },
    })
}

const postRocketStatus = async () => {
    const response = await got(`${process.env.ROCKET_ADDR}/status`);
    let body = response.body;
    let message
    if (body === "\"GO\""){
        message = "GO";
    } else {
        message = "NO GO";
    }
    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
        topic: 'responsePollRocket',
        messages: [
            {value: message},
        ],
    })
    console.log("Sended: "+message)
    await producer.disconnect()
}

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
    postInfo,
    listenTopicPoll
};