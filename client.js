(function () {
  const socket = io.connect('http://localhost:3000')
  socket.on('welcome', (data) => {
    console.log(data);
    socket.emit('welcomeBack', { welcomeBack: 'client1' });
  });

  // in case of server broadcast, log the message and reply confirmed
  socket.on('broadcast', (data) => {
    console.log('broadcast has been received:' + data);
    socket.emit('confirm', { clientID: 'client1' });
  });


  let timeOut = 5000
  setTimeout(() => socket.emit('notification', { clientID: 'client1' }), timeOut)
})()


