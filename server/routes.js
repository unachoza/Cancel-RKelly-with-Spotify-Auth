const express = require('express')
const router = express.Router()

const cancelController = require('./controller.js')
console.log("this is cancelController", cancelController)

router.get('/', cancelController.allUsers)
router.post('/users', cancelController.addUser)
router.post('/songs', cancelController.addSong)
router.get('/deletedsongs', cancelController.countDeletedSongs)
router.put('/songs', cancelController.updateSong)
router.get('/users/unique', cancelController.countUniqueUsers)

module.exports = router