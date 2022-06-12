require('module-alias/register')
const express = require('express')
const router = express.Router()
const UsersDbHelper = require('@helpers/UserDbHelper.js')
const errorHandler = require('@root/util/errorHandler.js')

router.get('/register', async (request, response) =>{
    const username = request.query.username
    const password = request.query.password
  
    if (username == undefined || password == undefined){
      return errorHandler.handleError(response, 'You have to provide a username and a password', 400)
    }
    const user = await UsersDbHelper.getUserByName(username)
    if(UsersDbHelper.doesUserExist(user)){
      return errorHandler.handleError(response, 'User arleady exists', 403)
    }
    await UsersDbHelper.addUser(username, password)
    response.send("User succesfuly created")
})
router.get('/setActiveUser', async (request, response) =>{
  const username = request.query.username
  const password = request.query.password

  if (username == undefined || password == undefined){
    return errorHandler.handleError(response, 'You have to provide a username and a password', 400)
  }
  const isLoginDataValid = await UsersDbHelper.isLoginDataValid(username, password)
  if (isLoginDataValid == false){
    return response
      .status(403)
      .json('Login data is invalid')
  }
  const user = await UsersDbHelper.getUserByName(username)
  global.currentActiveUser = user
  response.json(`${username} is now the active user`)

})
router.get('/isLoginDataValid', async(request, response) =>{
  const username = request.query.username
  const password = request.query.password
  if (username == undefined || password == undefined){
    return errorHandler.handleError(response, 'You have to provide a username and a password', 400)
  }
  const isLoginDataValid = await UsersDbHelper.isLoginDataValid(username, password)
  response.json(isLoginDataValid)

})
router.get('/getActiveUser', async(request, response) =>{
  if(!UsersDbHelper.isUserValid(currentActiveUser)){
    return errorHandler.handleError(response, 'Current active user does not exist', 400)
  }
  response.json(UsersDbHelper.getUsernameByUser(global.currentActiveUser))
})
  
module.exports = router