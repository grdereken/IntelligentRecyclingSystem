const chalk = require("chalk")
const authRoutes = require('./routes/auth/authRoutes.js')
const pointsRoutes = require('./routes/points/points.js')
const express = require('express')

const app = express()

global.currentActiveUser 
app.use((request, response, next)=>{
  console.log(chalk.red(`path: ${request.path}`))
  console.log(request.query)
  next()
})

app.use('/',authRoutes)
app.use('/', pointsRoutes)

app.listen(80)

