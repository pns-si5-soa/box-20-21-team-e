
const getPayloadInformation = async () => {

    const response = {}
    response.Traj = "Orbital"
    response.FutureSpeed = 100
    response.FutureAngle = 90
    console.log(JSON.stringify(response))
    return JSON.stringify(response)
};




module.exports = {
    getPayloadInformation
};