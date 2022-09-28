require('module-alias/register')
const express = require('express')
const router = express.Router()

const UsersDbHelper = require('@helpers/UserDbHelper.js')
const errorHandler = require('@root/util/errorHandler.js')
const authenticationHandler = require('@root/util/authenticationHandler.js')

const handlePointsRequest = [errorHandler.handlePointsRequest, authenticationHandler.handleAdminPassword]

router.get('/setActiveUserPoints', handlePointsRequest, async (request, response) =>{
    const {points} = request.query

    currentActiveUser = await UsersDbHelper.setPoints(global.currentActiveUser, parseInt(points))
    const newPoints = UsersDbHelper.getPoints(global.currentActiveUser)
    response.json(newPoints)
})
  
router.get('/addActiveUserPoints', handlePointsRequest,  async(request, response) =>{
    const {points}= request.query
    
    currentActiveUser = await UsersDbHelper.addPoints(currentActiveUser, parseInt(points))
    const newPoints = UsersDbHelper.getPoints(currentActiveUser)
    response.json(newPoints)
})

router.get('/getActiveUserPoints', async(request, response) =>{
    if(!UsersDbHelper.doesUserExist(global.currentActiveUser)){
        return response.json(0)
    }
    const points = UsersDbHelper.getPoints(currentActiveUser)
    response.json(points)
})

router.get('/getUserPoints', async(request, response) =>{
    const {username} = request.query
  
    const user = await UsersDbHelper.getUserByName(username)
    const points = UsersDbHelper.getPoints(user)
    response.json(points)
})

module.exports = router