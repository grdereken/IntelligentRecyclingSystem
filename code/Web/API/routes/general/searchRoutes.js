const express = require('express')
const router = express.Router()
const UsersDbHelper = require('@helpers/UserDbHelper.js')
const getPublicColumns = require('@util/getPublicColumns.js')

router.get('/search', async(request, response)=>{
    const {username} = request.query
    console.log(username)
    const users = UsersDbHelper.matchColumnPatern('username', username)
    const publicColumns = await getPublicColumns(users)
    response.send(publicColumns)
})
module.exports = router