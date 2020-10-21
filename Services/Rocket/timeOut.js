const destructionException = require('./routes/destructionException');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms*1000));
}

var isResponseReceive = false;

async function requestLaunch(){
    isResponseReceive = false;

    await sleep(2);

    if (isResponseReceive == false){
        destructionException.fail();
    }
}

function responseReceive(){
    isResponseReceive = true;
}


module.exports = {
    requestLaunch,
    responseReceive
};