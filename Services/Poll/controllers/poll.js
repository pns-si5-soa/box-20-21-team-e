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

    await producer.connect()
    await producer.send({
        topic: 'Poll',
        messages: [
            { value: 'New Poll' },
        ],
    })

    await producer.disconnect()
}

const getResponsePoll = async () =>{
    const consumer = kafka.consumer({ groupId: 'getResponsePoll' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'responsePoll', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                sender: message.sender.toString(),
                value: message.value.toString(),
            })
            switch (message.sender) {
                case "rocket":
                    responses.didElonRespond = true
                    responses.elonResponse = message.value
                    break
                case "weather":
                    responses.didToryRespond = true
                    responses.toryResponse = message.value
            }
            if (hasAllResponses()){
                if(responses.toryResponse === "\"GO\"" && responses.elonResponse === "\"GO\""){
                    return "GO"
                }else {
                    return "NO GO"
                }
            }
        },
    })
}

function hasAllResponses() {
    return responses.didToryRespond && responses.didElonRespond
}

module.exports = {
    getResponse:startPoll
};