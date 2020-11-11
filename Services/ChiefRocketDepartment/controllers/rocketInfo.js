const got = require('got');

const getStatus = async () => {
    console.log("caca2")
    try {
        const response = await got(`${process.env.ROCKET_ADDR}/status`);
        let body = response.body;
        console.log(`${process.env.ROCKET_ADDR}/status`)
        console.log(body)
        if (body == "\"GO\""){
            return "GO";
        } else {
            return "NO GO";
        }
    } catch (err) {
        console.error(err);
    }
};

function postInfo (req) {
    try {
        switch (req.body.info){
            case "SPLIT":
                console.log("CRD : La rocket s est split");
                return "OK";
            case "MAXQ":
                console.log("CRD : La rocket a atteint MAXQ");
                return "OK";
            default:
                console.log("CRD : Info inconnu recue");
                return "Unknown info : " + req.body.info;
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    postInfo,
    getStatus
};