const getStatus = async () => {
    try {
        console.log("Retourne que la fusée est prête à décoller");
        return "OK";
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getStatus
};