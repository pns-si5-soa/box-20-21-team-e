const getState = async () => {
    try {
        console.log("Retourne que la fusée est prête à décoller");
        return "Ready";
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getState
};