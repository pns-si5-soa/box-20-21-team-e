const data = require('../data');

function fail () {
    console.log("Rocket : Je viens d'apprendre que mon lancement est un echec")
    data.missionFailed = true
    return "OK"
}

module.exports = {
    fail
};