const UsersDbHelper = require('./helpers/UserDbHelper')
const errorHandler = require('./util/errorHandler')
const authRoutes = require('./routes/users/auth/authRoutes.js')
const express = require('express')

const app = express()

global.currentActiveUser

app.use((request, response, next)=>{
  console.log(request.query)
  next()
})

app.use('/',authRoutes)




app.get('/setPoints',errorHandler.handlePointsRequest, async (request, response) =>{
  const points = parseInt(request.query.points)

  currentActiveUser = await UsersDbHelper.setPoints(global.currentActiveUser, points)
  const newPoints = UsersDbHelper.getPoints(global.currentActiveUser)
  response.json(newPoints)
})

app.get('/addPoints', errorHandler.handlePointsRequest,  async(request, response) =>{
  const points = parseInt(request.query.points)

	currentActiveUser = await UsersDbHelper.addPoints(global.currentActiveUser, points)
  const newPoints = UsersDbHelper.getPoints(currentActiveUser)
	response.json(newPoints)
})
app.get('/getPoints', async(request, response) =>{
  if(!UsersDbHelper.isUserValid(global.currentActiveUser)){
    return response.json(0)
  }
  const points = UsersDbHelper.getPoints(currentActiveUser)
  response.json(points)
})
app.get('/getPointsFromLoginData',errorHandler.handleLoginData, async(request, response) =>{
  const username = request.query.username
  const password = request.query.password

  
  if(!UsersDbHelper.isLoginDataValid(username, password)){
    return response.json(0)
  }
  const user = await UsersDbHelper.getUserByName(username)
  const points = UsersDbHelper.getPoints(user)
  response.json(points)
})

app.listen(80)

