
module.exports = {
    handleError
}
async function handleError(response, error, status=500){
    response
        .status(status)
        .json(error)
}

