const getWeather = async () => {
    let randInt;
    try {
        randInt = Math.floor(Math.random() * Math.floor(1));
        switch (randInt) {
            case 0:
                return "Clear";
            case 1:
                return "Thunderstorm";
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getWeather
};