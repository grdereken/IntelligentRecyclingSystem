require('module-alias/register')
const UserDbHelper = require('@helpers/UserDbHelper.js')

module.exports = {
    isLoginDataValid
}
async function isLoginDataValid(username, password){
    const user = await UserDbHelper.getUserByName(username)
    if(user.password == password){
        return true
    }
    return false
}