require('module-alias/register')
const UsersDbHelper = require('@helpers/UserDbHelper.js')

async function handleError(response, error, status=500){
    response
        .status(status)
        .send(error)
}

async function handlePointsArgument(request, response, next){
    const points = parseInt(request.query.points)
    if(isNaN(points)){
        return handleError(response, 'Points argument has to be a number', 400)
    }
    next()
}
async function handleCurrentActiveUser(request, response, next){
    if(!UsersDbHelper.doesUserExist(global.currentActiveUser)){
        return handleError(response, 'Current active user is not valid', 400)
    }
    next()
}
async function handleLoginData(request, response, next){
    const {username, password} = request.query
    if (username == undefined || password == undefined){
        return handleError(response, 'You have to provide a username and a password', 400)
    }
    next()
}
const handlePointsRequest = [handlePointsArgument, handleCurrentActiveUser]

module.exports = {
    handleError,
    handleCurrentActiveUser,
    handleLoginData,
    handlePointsRequest
}