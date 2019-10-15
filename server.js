const express = require('express')
const logger = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')

const server = express()

server.use(logger('dev'))
server.use(express.static('public'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

server.get('/', (req, res) => {
    res.send('hello world; you have connected')
})
const cancelRoutes = require('./server/routes')
server.use('/db', cancelRoutes)

server.use('*', (req, res) => {
    res.status(400).json({
        message: 'Endpoint not found. But you can definitely find it; Keep trying!'
    })
})

