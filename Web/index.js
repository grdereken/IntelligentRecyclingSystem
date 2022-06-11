const UsersDbHelper = require('./helpers/UserDbHelper')
const ValidateFunctions = require('./modules/ValidateFunctions.js')
const authRoutes = require('./routes/users/auth/authRoutes.js')
const express = require('express')

const app = express()

let currentActiveUser

app.use((request, response, next)=>{
  console.log(request.query)
  next()
})
app.use('/users/auth',authRoutes)


app.get('/setActiveUser', async (request, response) =>{
  const username = request.query.username
  const password = request.query.password

  const isLoginDataValid = await UsersDbHelper.isLoginDataValid(username, password)
  if (isLoginDataValid == false){
    
    response
    .status(403)
    .json('Login data is invalid')
    return
  }
  try{
    currentActiveUser = username
    response.json(`${username} is now the active user`)
  }
  catch(error){
    response
    .status 
    .json(error)
  }
})
app.get('/setPoints', async (request, response) =>{
  const points = parseInt(request.query.points)
  
  try{
    await UsersDbHelper.setPoints(currentActiveUser, points)
    const newPoints = await UsersDbHelper.getPoints(currentActiveUser)
    response.send(newPoints)
  }
  catch(error){
    response
    .status(500)
    .json(error)
  }
})


app.get('/isLoginDataValid', async(request, response) =>{
  const username = request.query.username
  const password = request.query.password
  
  const isLoginDataValid = await UsersDbHelper.isLoginDataValid(username, password)
  response.send(isLoginDataValid)

})


app.get('/addPoints', async(request, response) =>{
  const points = parseInt(request.query.points)
  try{
	  await UsersDbHelper.addPoints(currentActiveUser, points)
    const newPoints = await UsersDbHelper.getPoints(currentActiveUser)
	  response.json(newPoints.points)
	
  }
  catch(error){
	  response
    .status(500)
    .json(error)
  }

})

app.get('/getPoints', async(request, response) =>{
  try{
    const points = await UsersDbHelper.getPoints(currentActiveUser)
    console.log(points)
  }
  catch(error){
    console.log(error)
    response
    .status(500)
    .send(error)
  }
})

app.get('/getActiveUser', async(request, response) =>{
  response.send(currentActiveUser | '')
})

app.listen(80)