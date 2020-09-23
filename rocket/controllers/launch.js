const launch = async () => {
    try {
        console.log("Lancement de la fusée !!!")
        return "Ok";
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    launch
};