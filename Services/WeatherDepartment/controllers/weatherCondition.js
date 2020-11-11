const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'BlueOriginX',
    brokers: ['kafka:9092']
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
    const consumer = kafka.consumer({ groupId: 'pollWeatherMember' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'Poll', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            await postWeatherCondition();
        },
    })
}

const postWeatherCondition = async () => {
    const got = require('got');
    const getWeather = async() =>{
        const response = await got(`${process.env.WEATHER_SUPPLIER_ADDR}/status`);
        return response.body;
    }
    const result = await getWeather()
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
        topic: 'responsePollWeather',
        messages: [
            { value: message},
        ],
    })
    console.log("Sended: "+message)

    await producer.disconnect()
}

module.exports = {
    getWeatherCondition:listenTopicPoll
};