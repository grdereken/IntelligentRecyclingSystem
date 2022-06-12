const knex = require('knex')
const config = require('../knexfile.js')
const db = knex(config.development)

module.exports = {
    getUserByName,
    addUser,
    addPoints,
    isLoginDataValid,
    getPoints,
    getUsernameByUser,
    isUserValid,
    doesUserExist
}


async function getUserByName(username){
    return db('users')	
	    .where({username})
	    .first()
}
function getUsernameByUser(user){
    return user.username
}
async function addUser(username, password){
    return db('users').insert({username, password})
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
    if(!isUserValid(user)){
        return false
    }else if(user.password != password){
        return false
    }
    return true
}
function isUserValid(user){
    if(doesUserExist(user) == false){
        return false
    }
    return isUserPropertiesValid(user)
}
function isUserPropertiesValid(user){
    for(const property in user){
        if(user[property] == undefined){
            return false
        }
    }
    return true
}
function doesUserExist(user){
    if(user == undefined){
        return false
    }
    return true
}