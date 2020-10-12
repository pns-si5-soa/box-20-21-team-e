const got = require('got');

const success = async () => {
    try {
        await got(`${process.env.ROCKET_ADDR}/success`);

        console.log("Elon : Je viens d'apprendre que le lancement est un succes")
        return "OK"
    } catch (err) {
        console.error(err);
    }
}


module.exports = {
    success
};