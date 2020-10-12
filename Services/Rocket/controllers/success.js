const rocketData = require('../data').rocketData;

function success () {
    console.log("Rocket : Je viens d'apprendre que mon lancement est un succes")
    rocketData.missionSuccessful = 1
    return "OK"
}

module.exports = {
    success
};