
const getWeatherCondition = async () => {
    try {
        const got = require('got');
        const getWeather = async() =>{
            const response = await got('http://localhost:4006/weather');
            return response.body;
        }
        return getWeather().then(function (result) {
            console.log(result)
            switch (result) {
                case "\"Clear\"":
                    return "OK";
                default:
                    return "NOT OK";
            }
        })
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getWeatherCondition
};