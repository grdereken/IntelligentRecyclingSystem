const knex = require('knex')
const dbConfig = require('../knexfile.js')
let db
console.log(dbConfig.debugMode)
if(dbConfig.debugMode){
    db = knex(dbConfig.development)
}else{
    db = knex(dbConfig.production)
}


module.exports = {
    getUserByName,
    getUserById,
    addUser,
    addPoints,
    isLoginDataValid,
    setPoints,
    resetAllUserPoints,
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
    return await getUserByName(username)//its purpose is to update the user object
}
async function resetAllUserPoints(){
    await db('users')
        .update({'points': 0})
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