const sqlite3 = require('sqlite3').verbose()
const UsersDbHelper = require('./models/UserDbHelper')
const ValidateFunctions = require('./modules/ValidateFunctions.js')

const express = require('express')
const { response } = require('express')
const { request } = require('express')
const app = express()

let currentActiveUser

app.use((request, response, next)=>{
  console.log(request.query)
  next()
})

app.get('/register', async (request, response) =>{
  const username = request.query.username
  const password = request.query.password

  if (!username || !password){
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

app.get('/setActiveUser', async (request, response) =>{
  const username = request.query.username
  const password = request.query.password
  const DoesUserExist = await ValidateFunctions.checkUser(username, password)
  if (!username || !password){
      response.send("You have to provide a username and a password")
      return;
  } 
  if (DoesUserExist == false){
    response.send("You have to provide the correct username and password")
    return
  }

  currentActiveUser = username
  response.send(`${username} is now the active user`)
  console.log(currentActiveUser)
})

app.get('/setPoints', async (request, response) =>{
  const points = request.query.points
  

  UsersDbHelper.setPoints(currentActiveUser, points)
  
  .then(()=>{
    response.send(`${currentActiveUser} now has ${points} points`)
    // If user doesnt exist then it doesnt actually set the points
    //but its not gonna return an error so be careful when using it
  })


})


app.get('/isLoginDataValid', async(request, response) =>{
  const username = request.query.username
  const password = request.query.password
  
  const result = await ValidateFunctions.checkUser(username, password)
  response.send(result)

})

app.get('/addPoints', async(request, response) =>{
  const points = request.query.points

  UsersDbHelper.AddPoints(currentActiveUser, points)

})
app.listen(80)