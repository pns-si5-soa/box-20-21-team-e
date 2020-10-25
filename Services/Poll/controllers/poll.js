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

const getElonResponse = async () => {
    try {
        const response = await got(`${process.env.CHIEF_ROCKET_DEPARTMENT_ADDR}/status`); // The rocket
        return response.body;
    } catch (err) {
        console.error(err);
    }
};

const getToryResponse = async () => {
    try {
        const response = await got(`${process.env.WEATHER_DEPARTMENT_ADDR}/status`); //weather chief
        return response.body;
    } catch (err) {
        console.error(err);
    }
};

const getResponse = async () => { //reponse pour lancer 
    try {
        const tory = await getToryResponse();
        const elon = await getElonResponse();
        const richard = 'GO'; //reponse de richard
        if (tory === "\"GO\"" && elon === "\"GO\"" && richard === "GO") {
            return "GO";
        } else {
            return "NO GO";
        }


    } catch (err) {
        console.error(err);
    }
};

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
    await got(`${process.env.CHIEF_ROCKET_DEPARTMENT_ADDR}/status`)
    await got(`${process.env.WEATHER_DEPARTMENT_ADDR}/status`)
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
            console.log("MESSAGE: " + message.value.toString())
            responses.didToryRespond = true
            console.log("didToryRespond: "+responses.didToryRespond)
            responses.toryResponse = message.value.toString()
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