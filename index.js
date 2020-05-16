require('es6-promise').polyfill()
require('isomorphic-fetch')
const app = require('express')()


const port = 3000
app.get('/', (req, res) => res.json({message: 'Hello world'}))


const server = app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

const io = require('socket.io')(server)
io.on('connection', (socket) => {
  console.log('new user connected')
  socket.emit('welcome', { hello: 'world' })
  socket.on('welcomeBack', (message) => console.log(message))
  
  socket.on('notification', (data) => {
    console.log(`Broadcast due to --> Notification from ${data.clientID}`)
    io.sockets.emit('broadcast', {message: 'broadcast message'})
  })

  socket.on('confirm', (data) => console.log(`${data.clientID} has confirmed the broadcast`))

})


// test the server connection by sending a request using Fetch API
setTimeout(()=>{
  fetch('http://localhost:3000')
    .then((res) => res.json())
    .then((data) => console.log(`Server test succeeded with welcome data :${data.message}`))
},5000)

