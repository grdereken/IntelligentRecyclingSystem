const UserDbHelper = require('../models/UserDbHelper.js')

module.exports = {
    checkUser
}
async function checkUser(username, password){
    const result = await UserDbHelper.checkUser(username, password)
    if(result.length == 0){
        return false
    }
    return true
}