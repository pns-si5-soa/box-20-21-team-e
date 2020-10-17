const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'BlueOriginX',
    brokers: ['kafka1:9092']
})

//TODO: Faire le consumer sur Poll pour savoir quand machiner le weather là
const getWeatherCondition = async () => {
    try {
        const got = require('got');
        const getWeather = async() =>{
            const response = await got(`${process.env.WEATHER_SUPPLIER_ADDR}/status`);
            return response.body;
        }
        return getWeather().then(function (result) {
            console.log(result)
            switch (result) {
                case "\"Clear\"":
                    return "GO";
                default:
                    return "NO GO";
            }
        })
    } catch (err) {
        console.error(err);
    }
};

const listenTopicPoll = async  () => {
    const consumer = kafka.consumer({ groupId: 'pollMember' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'Poll', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message.value === "New poll"){
                await postWeatherCondition();
            }
        },
    })
}

const postWeatherCondition = async () => {
    const got = require('got');
    const getWeather = async() =>{
        const response = await got(`${process.env.WEATHER_SUPPLIER_ADDR}/status`);
        return response.body;
    }
    const result = getWeather()
    let message;
    switch (result) {
        case "\"Clear\"":
            message =  "GO";
            break
        default:
            message =  "NO GO";
    }
    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
        topic: 'responsePoll',
        messages: [
            { sender: 'weather' ,
            value:message},
        ],
    })

    await producer.disconnect()
}

module.exports = {
    getWeatherCondition
};