// Define the express

var express = require('express')
var app = express()

app.use(express.static(__dirname))

app.get('/messages', (req, res) =>{
    res.send('hello')
})

var server = app.listen(8000, () => { 
    console.log('server is listening on port', server.address().port)
})