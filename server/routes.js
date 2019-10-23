const express = require('express')
const router = express.Router()

const cancelController = require('./controller.js')
console.log("this is cancelController", cancelController)

router.get('/', cancelController.allUsers)
router.post('/users', cancelController.addUser)
router.post('/songs', cancelController.countSong)

module.exports = router