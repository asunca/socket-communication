(function () {
  const socket = io.connect('http://localhost:3000')
  socket.on('welcome', (data) => {
    console.log(data);
    socket.emit('welcomeBack', { welcomeBack: 'client2' });
  });

  // inform the channel that Client2 has connected 
  socket.emit('notification', { clientID: 'client2' })

  // in case of server broadcast, log the message and reply confirmed
  socket.on('broadcast', (data) => {
    console.log('broadcast has been received:' + data);
    setTimeout(() => socket.emit('confirm', { clientID: 'client2' }), 2000)
  })
})()



