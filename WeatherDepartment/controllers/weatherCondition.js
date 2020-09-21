
const getWeatherCondition = async () => {

    try {
        var response = "Clear"; //response doit être le résultat de la requete GET vers le WeatherSupplier ( GET localhost:4006/weather)
        switch (response){
            case "Clear":
                return "OK";
            default:
                return "NOT OK";
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getWeatherCondition
};