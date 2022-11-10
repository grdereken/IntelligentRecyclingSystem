const chalk = require('chalk')
const cors = require('cors')
const authRoutes = require('./routes/auth/authRoutes.js')
const searchRoutes = require('./routes/general/searchRoutes.js')
const pointsRoutes = require('./routes/points/pointsRoutes.js')
const debugModeHelper = require('./helpers/DebugModeHelper.js')

const express = require('express')

const app = express()



global.currentActiveUser 

debugModeHelper.initDebugMode()

app.use(cors())
app.use((request, response, next)=>{
  console.log(chalk.red(`path: ${request.path}`))
  console.log(request.query)
  next()
})


app.use('/',authRoutes)
app.use('/', pointsRoutes)
app.use('/', searchRoutes)

app.listen(4200)
