const knex = require('knex')
const getPublicColumns = require('@util/getPublicColumns')

knex.knex.QueryBuilder.extend('getPublicColumns', function(){
    return getPublicColumns(this)
})
const dbConfig = require('../knexfile.js')
let db
if(dbConfig.debugMode){
    console.log('Running on debug mode')
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

function setPoints(user, points){
    const username = getUsernameByUser(user)
    db('users')
        .where({username})
        .update({points})
        .then(()=>{ //Do not remove this because weird bugs are gonna happen

        })
    return getUserByName(username)
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