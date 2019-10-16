const {cancel} = require('./model')
const cancelController = {}


//Get All Users
exports.allUsers = (req, res) => {
    cancel.allUsers()
    .then(data => {
        res.json({
            message: 'all users here',
            data: data
        })
    })
    .catch(err => {
        res.status(500).json({err})
    })
}

//Add User to Database
exports.addUser = (req, res) => {
    cancel.addUser()
    .then(data => {
        res.json({
            message: "added user",
            data: data
        })
    }) 
    .catch(err => {
        res.status(500).json({err})
    })
}

//Add Songs to Datbase
exports.countSong = (req, res) => {
    cancel.countSong()
    .then(data => {
        res.json({
            message: "counting this song",
            data: data
        })
    })
    .catch(err => {
        res.status(500).json(err)
    })
}

module.export = cancelController 