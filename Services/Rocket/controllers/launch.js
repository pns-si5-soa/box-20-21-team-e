const launch = async () => {
    try {
        console.log("Lancement de la fusée !!!")
        return "OK";
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    launch
};