
const getWeatherCondition = async () => {
    try {
        const got = require('got');
        const getWeather = async() =>{
            const response = await got('http://localhost:4005/status');
            return response.body;
        }
        return getWeather().then(function (result) {
            console.log(result)
            switch (result) {
                case "\"Clear\"":
                    return "GO";
                default:
                    return "NO GO";
            }
        })
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getWeatherCondition
};