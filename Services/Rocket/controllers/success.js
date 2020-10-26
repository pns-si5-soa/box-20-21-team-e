const data = require('../data');

function success () {
    console.log("Rocket : Je viens d'apprendre que mon lancement est un succes")
    data.missionSuccessful = true;
    return "OK"
}

module.exports = {
    success
};