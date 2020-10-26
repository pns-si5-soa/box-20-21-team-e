const got = require('got');
const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'BlueOriginX',
    brokers: ['kafka:9092']
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms*1000));
}

async function waitFirstTankIsEmpty () {
    let firstStageTank = 100;
    console.log("ChiefRocketDepartment : Waiting for first stage tank equal to 0")
    while (firstStageTank >= 20){
        let response = await got(`${process.env.TELEMETRY_ADDR}/rocketData`)
        firstStageTank = JSON.parse(response.body).firstStage.tankPercentage;
        await sleep(1);
    }
    await postSplitOrder();
    console.log("First tank empty")
    return "First tank empty"
}

async function waitMaxQ () {
    let time = 0
    let angle = 0
    console.log("ChiefRocketDepartment : Waiting for maxQ")
    while (time <= 10){
        let response = await got(`${process.env.TELEMETRY_ADDR}/rocketData`)
        time = JSON.parse(response.body).time
        angle = JSON.parse(response.body).secondStage.angle
        await sleep(1);
    }
    await postMaxQ(angle);
    console.log("MaxQ atteint, on ralenti")
    return "MaxQ atteint"
}

const getStatus = async () => {
    try {
        const response = await got(`${process.env.ROCKET_ADDR}/status`);
        let body = response.body;
        if (body === "\"GO\""){
            return "GO";
        } else {
            return "NO GO";
        }
    } catch (err) {
        console.error(err);
    }
};

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

const postOrder = async (req) => {
    try {
        switch (req.body.order){
            case "LAUNCH":
                const postLaunchOrderRes = postLaunchOrder()
                return postLaunchOrderRes;
                break;
            case "SPLIT":
                const splitOrderRes = postSplitOrder();
                return splitOrderRes;
                break;
            default:
                res.json("Unknown request");
        }
    } catch (err) {
        console.error(err);
    }
};


const postLaunchOrder = async () => {
    try {
        const {body} = await got.post(`${process.env.ROCKET_ADDR}/order`, {
            json: {
                order: 'LAUNCH'
            },
            responseType: 'json'
        });
        waitFirstTankIsEmpty();
        waitMaxQ();
        return body;
    } catch (err) {
        console.error(err);
    }
};

const postMaxQ = async (angle) => {
    try {
        const {body} = await got.post(`${process.env.ROCKET_ADDR}/order`, {
            json: {
                order: 'TRAJCHANGE',
                "futurSpeed": 30,
                "futurAngle": angle
            },
            responseType: 'json'
        });
        return body;
    } catch (err) {
        console.error(err);
    }
};

const postSplitOrder = async () => {
    try {
        const {body} = await got.post(`${process.env.ROCKET_ADDR}/order`, {
            json: {
                order: 'SPLIT'
            },
            responseType: 'json'
        });
        return body;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getStatus:listenTopicPoll,
    postOrder
};