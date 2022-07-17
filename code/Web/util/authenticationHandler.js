require('dotenv').config()
const errorHandler = require('./errorHandler')
const ADMIN_PASSWORD_ERROR = 'Invalid Admin Password'
module.exports = {
    handleAdminPassword
}
async function handleAdminPassword(request, response, next){
    const {adminPassword} = request.query
    if(adminPassword != process.env.ADMIN_PASSWORD){
        return errorHandler.handleError(response, ADMIN_PASSWORD_ERROR, 403)
    }
    next()
}
