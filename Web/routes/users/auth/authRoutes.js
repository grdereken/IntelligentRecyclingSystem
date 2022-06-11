require('module-alias/register')
const express = require('express')
const router = express.Router()
const UsersDbHelper = require('@helpers/UserDbHelper.js')
router.get('/register', async (request, response) =>{
    const username = request.query.username
    const password = request.query.password
  
    if (username == undefined || password == undefined){
      response.send("You have to provide username and password")
      return;
    }
  
    try {
      await UsersDbHelper.addUser(username, password)
      response.send("User succesfuly created")
    }
    catch(error){
      response.send(error)
    }
  
    
})
router.get('/isLoginDataValid', async(request, response) =>{
    const username = request.query.username
    const password = request.query.password
    
    const result = await ValidateFunctions.checkUser(username, password)
    response.send(result)
})
  
module.exports = router