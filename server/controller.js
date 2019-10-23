const canceldatabase = require('./model')
const cancelController = {}
console.log("this is the cancel", canceldatabase)


//Get All Users
cancelController.allUsers = (req, res) => {
    canceldatabase.allUsers()
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
cancelController.addUser = (req, res) => {
    canceldatabase.addUser()
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
cancelController.countSong = (req, res) => {
    canceldatabase.countSong()
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

module.exports = cancelController 