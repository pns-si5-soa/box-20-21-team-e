const got = require('got');
const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'BlueOriginX',
    brokers: ['kafka:9092']
})

async function getData(){
    const response = await got(`${process.env.ROCKET_ADDR}/data`);
    return JSON.parse(response.body)
}


module.exports = {
    getData
};