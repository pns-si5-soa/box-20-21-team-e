const got = require('got');

const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'BlueOriginX',
    brokers: ['kafka:9092']
})


let responses= {
    didToryRespond: false,
    didElonRespond: false,
    toryResponse: "NO GO",
    elonResponse: "NO GO"
}





const startPoll = async () =>{
    const producer = kafka.producer()
    responses.didElonRespond = false
    responses.didToryRespond = false
    await producer.connect()
    await producer.send({
        topic: 'Poll',
        messages: [
            { value: 'New Poll' },
        ],
    })

    await producer.disconnect()
    console.log(responses.didToryRespond + "..."+responses.didElonRespond)
    await got(`${process.env.ROCKET_POLL_ADDR}/startKafka`)
    await got(`${process.env.WEATHER_DEPARTMENT_ADDR}/startKafka`)
    const rocket = getResponseRocket()
    const weather = getResponseWeather()
    const decision = Promise.all([rocket,weather]).then(async(results)=>{
        while (true){
            await new Promise(r => setTimeout(r, 300));
            if (hasAllResponses()){
                console.log(responses)
                if (responses.toryResponse === "GO" && responses.elonResponse === "GO") {
                    return "GO"
                } else {
                    return "NO GO"
                }
            }
        }
    })
    return await decision







}

const getResponseRocket = async () =>{
    const consumer = kafka.consumer({ groupId: 'getResponseRocket' })

    await consumer.connect()
    await consumer.subscribe({ topic: "responsePollRocket", fromBeginning: true })
    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log("MESSAGE: " + message.value.toString())
            responses.didElonRespond = true
            console.log("didElonRespond: "+responses.didElonRespond)
            responses.elonResponse = message.value.toString()
            return message.value
        },

    })



}

const getResponseWeather = async () =>{
    const consumer = kafka.consumer({ groupId: 'getResponseWeather' })

    await consumer.connect()
    await consumer.subscribe({ topic: "responsePollWeather", fromBeginning: true })
    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            responses.didToryRespond = true
            responses.toryResponse = message.value.toString()
            console.log("Response")
            return message.value
        },
    })
}

function hasAllResponses() {
    return responses.didToryRespond && responses.didElonRespond
}

module.exports = {
    getResponse:startPoll
};