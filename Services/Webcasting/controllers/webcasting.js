const got = require('got');
const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'BlueOriginX',
    brokers: ['kafka:9092']
})



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms*1000));
}



const startWebcasting = async () => {
    try {
        await getMissionStatus();
        return "Starting reading mission status"
    } catch (err) {
        console.error(err);
    }
}

const getMissionStatus = async () =>{
    const consumer = kafka.consumer({ groupId: 'getMissionStatus' })

    await consumer.connect()
    await consumer.subscribe({ topic: "MissionStatus", fromBeginning: true })
    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log(message.value.toString())
        },

    })

}

const stopWebcasting = async () => {
    try {
        return "TODO"
    } catch (err) {
        console.error(err);
    }
}


module.exports = {
    stopWebcasting,
    startWebcasting
};