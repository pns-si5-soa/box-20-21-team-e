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

        },
    })
}

const postRocketStatus = async () => {
    console.log("bla")
    const response = await got(`${process.env.ROCKET_ADDR}/status`);
    console.log("blo")
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

module.exports = {
    listenTopicPoll
};