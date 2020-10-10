const getStatus = async () => {
    try {
        console.log("rocket : return rocket status \"GO\"");
        const res = "GO";
        return res;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getStatus
};