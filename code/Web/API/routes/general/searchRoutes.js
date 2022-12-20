const express = require('express')
const router = express.Router()
const UsersDbHelper = require('@helpers/UserDbHelper.js')


router.get('/search', async(request, response)=>{
    const {username} = request.query
    console.log(username)
    const users = await UsersDbHelper
        .matchColumnPatern('username', username)
        .getPublicColumns()

    response.send(users)
})
module.exports = router