const usersDbHelper = require('./UserDbHelper.js')
const dbConfig = require('../knexfile.js')

module.exports = {
    initDebugMode
}

function initDebugMode(){
    if (dbConfig.debugMode){
        usersDbHelper.resetAllUserPoints()
    }
}