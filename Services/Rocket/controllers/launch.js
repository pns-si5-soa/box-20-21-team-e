const launch = async () => {
    try {
        console.log("Rocket Launched !")
        return "LAUNCHED";
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    launch
};