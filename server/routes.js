const express = require('express')
const router = express.Router()

const cancelController = require('./controller.js')


router.post('/users', cancelController.addUser)
router.get('/', cancelController.allUsers)
router.post('/songs', cancelController.countSong)

module.exports = router