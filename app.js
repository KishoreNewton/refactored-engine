const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const Nexmo = require('nexmo')
const socketio = require('socket.io')
const { response } = require('express')

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
    const from = 'kishore Newton'
    const to = req.body.number
    const text = req.body.text
    const opts = {
      "type": "unicode"
    }
    
    nexmo.message.sendSms(from, to, text, opts, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
                const data = {
                    id: responseData.messages[0]['message-id'],
                    number: responseData.messages[0]['to']
                }
                io.emit('smsStatus', data)
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
})

const port = 3000

const server = app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

const io = socketio(server)
io.on('connection', (socket) => {
    console.log('connected')
    io.on('disconnect', () => {
        console.log('disconnected')
    })
})