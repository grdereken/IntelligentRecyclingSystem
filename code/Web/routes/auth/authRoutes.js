require('module-alias/register')
const express = require('express')
const router = express.Router()
const UsersDbHelper = require('@helpers/UserDbHelper.js')
const errorHandler = require('@root/util/errorHandler.js')

router.get('/register', errorHandler.handleLoginData, async(request, response) =>{
  const {username, password} = request.query

  const user = await UsersDbHelper.getUserByName(username)
  if(UsersDbHelper.doesUserExist(user)){
    return errorHandler.handleError(response, 'User arleady exists', 403)
  }
  await UsersDbHelper.addUser(username, password)
  response.send("User succesfuly created")
})

router.get('/setActiveUser', errorHandler.handleLoginData, async (request, response) =>{
  const {username, password} = request.query
  
  const isLoginDataValid = await UsersDbHelper.isLoginDataValid(username, password)
  if (!isLoginDataValid){
    return errorHandler.handleError(response, 'Login data is invalid', 403)
  }
  const user = await UsersDbHelper.getUserByName(username)
  global.currentActiveUser = user
  response.send(`${username} is now the active user`)
})

router.get('/isLoginDataValid', errorHandler.handleLoginData ,async(request, response) =>{
  const {username, password} = request.query

  const isLoginDataValid = await UsersDbHelper.isLoginDataValid(username, password)
  response.json(isLoginDataValid)
})

router.get('/getActiveUser', async(request, response) =>{
  if(!UsersDbHelper.doesUserExist(global.currentActiveUser)){
    return response.send("")
  }
  response.send(UsersDbHelper.getUsernameByUser(global.currentActiveUser))
})
  
module.exports = router