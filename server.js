// Define the express here

var express = require('express')
var bodyParser = require('body-parser')
var app = express()

// Create the HTTP server with Node that will then share with Express and Socket.IO.
var http = require('http').Server(app)
// Socket.IO is a library that enables real-time, bidirectional and event-based communication between the browser and the server
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var messages = [
    {name: 'Tim', message: 'Hola'},
    {name: 'Jane', message: 'Hello'}
]

app.get('/messages', (req, res) =>{
    res.send(messages)
})

app.post('/messages', (req, res) =>{
    //console.log(req.body)
    messages.push(req.body)
    // Submit an event from the server to all clients notifying them of a new message
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

var server = http.listen(8000, () => { 
    console.log('server is listening on port', server.address().port)
})