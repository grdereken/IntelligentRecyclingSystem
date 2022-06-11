const knex = require('knex')
const config = require('../knexfile.js')
const db = knex(config.development)

module.exports = {
    getUserByName,
    addUser,
    addPoints,
    isLoginDataValid,
    getPoints
}


async function getUserByName(username){
    return db('users')	
	.where({username})
	.first()
}
async function addUser(username, password){
    return db('users').insert({username: username, password: password})
    
}
async function setPoints(username, points){
    return db('users')
        .where({username})
        .update({points})
}
async function getPoints(username){
    return db('users')
        .where({username})
        .select('points')
        .first()
}
async function addPoints(username, pointsToAdd){
    console.log('hi')
    const user = await getUserByName(username)
    const newPoints = user.points + pointsToAdd
    console.log(`${username} now has ${newPoints} points`)
    return await setPoints(username, newPoints)
}

async function isLoginDataValid(username, password){
    const user = await UserDbHelper.getUserByName(username)
    if(user.password == password){
        return true
    }
    return false
}