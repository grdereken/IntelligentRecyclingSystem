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

app.use('/users/auth',authRoutes)




app.get('/setPoints', async (request, response) =>{
  const points = parseInt(request.query.points)
  if(isNaN(points)){
    return errorHandler.handleError(response, 'Points argument has to be a number', 400)
  }
  if(!UsersDbHelper.isUserValid(currentActiveUser)){
    return errorHandler.handleError(response, 'Current active user is not valid', 400)
  }
  currentActiveUser = await UsersDbHelper.setPoints(currentActiveUser, points)
  const newPoints = UsersDbHelper.getPoints(currentActiveUser)
  response.json(newPoints)
})

app.get('/addPoints', async(request, response) =>{
  const points = parseInt(request.query.points)

  if(isNaN(points)){
    return errorHandler.handleError(response, 'Points argument has to be a number', 400)
  }
  if(!UsersDbHelper.isUserValid(currentActiveUser)){
    return errorHandler.handleError(response, 'Current active user is not valid', 400)
  }
	currentActiveUser = await UsersDbHelper.addPoints(currentActiveUser, points)
  const newPoints = UsersDbHelper.getPoints(currentActiveUser)
	response.json(newPoints)
})
app.get('/getPoints', async(request, response) =>{
  const username = request.query.username
  const user = await UsersDbHelper.getUserByName(username)

  if(!UsersDbHelper.isUserValid(user)){
    return errorHandler.handleError(response, 'The user you have provided is not valid', 400)
  }
  const points = UsersDbHelper.getPoints(user)
  response.json(points)
})

app.get('/getActiveUser', async(request, response) =>{
  if(!UsersDbHelper.isUserValid(currentActiveUser)){
    return errorHandler.handleError(response, 'Current active user does not exist', 400)
  }
  response.json(UsersDbHelper.getUsernameByUser(user))
})

app.listen(80)

