const chalk = require('chalk')
const cors = require('cors')
const authRoutes = require('./routes/auth/authRoutes.js')
const searchRoutes = require('./routes/general/searchRoutes.js')
const pointsRoutes = require('./routes/points/pointsRoutes.js')

const express = require('express')

const app = express()



global.currentActiveUser 

app.use(cors())
app.use((request, response, next)=>{
  console.log(chalk.red(`path: ${request.path}`))
  console.log(request.query)
  next()
})


app.use('/',authRoutes)
app.use('/', pointsRoutes)
app.use('/', searchRoutes)

app.listen(80)

