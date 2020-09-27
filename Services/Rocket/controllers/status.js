const getStatus = async () => {
    try {
        console.log("Return rocket status");
        const res = "GO";
        return res;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getStatus
};