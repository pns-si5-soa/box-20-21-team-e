const got = require('got');
const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'BlueOriginX',
    brokers: ['kafka:9092']
})

const setPoll = async () => {
    try {
        const response = await got(`${process.env.POLL_ADDR}/poll`); // Poll service
        await sendMissionStatus("Rocket preparation")
        if (response.body == "\"GO\"") {
            // if go from Poll service, launch order to CRD
            const {body} = await got.post(`${process.env.CHIEF_ROCKET_DEPARTMENT_ADDR}/order`, {
                json: {
                    order: 'LAUNCH'
                },
                responseType: 'json'
            });
            await sendMissionStatus("Launch")
            return body;
        } else {
            return "NO GO"
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
    setPoll
};