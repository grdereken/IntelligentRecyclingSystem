const knex = require('knex')
const config = require('../knexfile.js')
const db = knex(config.development)
module.exports = {
    addUser,
    setPoints,
    checkUser,
    AddPoints
}   
async function addUser(username, password){
    return db('users').insert({username: username, password: password})
    
    
}

async function setPoints(username, points){
    return db('users')
        .where({username})
        .update({points})
        

}
async function GetPoints(username){
    return db('users')
        .select('points')
        .where('username', username)
}
async function AddPoints(username, pointsToAdd){
    const points = await GetPoints(username)
    setPoints(username, parseInt(points[0].points) + parseInt(pointsToAdd))

}
async function checkUser(username, password){
    return db('users')
        .select('username')
        .where('username', username)
        .where('password', password)
    
}

