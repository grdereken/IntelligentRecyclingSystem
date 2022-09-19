const knex = require('knex')
const config = require('../knexfile.js')
const db = knex(config.development)

module.exports = {
    getUserByName,
    getUserById,
    addUser,
    addPoints,
    isLoginDataValid,
    setPoints,
    getPoints,
    getUsernameByUser,
    doesUserExist,
    matchColumnPatern
}


function getUserByName(username){
    return db('users')	
	    .where({username})
	    .first()
}
function getUsernameByUser(user){
    return user.username
}
function getUserById(id){
    return db('users')	
	    .where({id})
	    .first()
}
function addUser(username, password){
    return db('users')
        .insert({username, password})
}

async function setPoints(user, points){
    const username = getUsernameByUser(user)
    await db('users')
        .where({username})
        .update({points})
    return await getUserByName(username)//it's purpose is to update the user object
}
function getPoints(user){
    return user.points
}
async function addPoints(user, pointsToAdd){
    const newPoints = user.points + pointsToAdd
    return await setPoints(user, newPoints)
}
async function isLoginDataValid(username, password){
    const user = await getUserByName(username)
    if(user?.password != password){
        return false
    }
    return true
}
function doesUserExist(user){
    if(user == undefined){
        return false
    }
    return true
}

function matchColumnPatern(column, value){
    return db('users')
        .where(column, 'like', `%${value}%`)
}