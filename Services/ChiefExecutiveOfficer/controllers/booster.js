const got = require('got');

const postOrder = async (req) => {
    try {
        const response = await got('http://localhost:4007/rocketData');
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    postOrder
};