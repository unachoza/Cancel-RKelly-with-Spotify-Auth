const express = require('express')
const router = express.Router()

const cancelController = require('../server/controller')

router.get('/', cancelController.allUsers)
router.post('/users', cancelController.addUser)
router.post('/songs', cancelController.countSong)

module.exports = router