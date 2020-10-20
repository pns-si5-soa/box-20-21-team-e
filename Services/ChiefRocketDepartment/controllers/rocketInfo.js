const got = require('got');

const getStatus = async () => {
    try {
        const response = await got(`${process.env.ROCKET_ADDR}/status`);
        let body = response.body;
        if (body == "\"GO\""){
            return "GO";
        } else {
            return "NO GO";
        }
    } catch (err) {
        console.error(err);
    }
};

const postInfo = async (req) => {
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