const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const Nexmo = require('nexmo')
const socketio = require('socket.io')

const nexmo = new Nexmo({
    apiKey: process.env.NEXMO_MESSAGE_API_KEY,
    apiSecret: process.env.NEXMO_SECRET_KEY,
}, {debug: true})


const app = express()

app.set('view engine', 'html')
app.engine('html', ejs.renderFile)

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/' , (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    res.send(req.body)
    console.log(req.body)
})

const port = 3000

const server = app.listen(port, () => {
    console.log(`listening on port ${port}`)
})