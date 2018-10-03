var socket = io();
socket.on('connect', function() {
  console.log('connect');

  // eg custom event
  socket.emit('createMessage', {
    from: 'someone',
    text: 'hello world',
  });
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('new message', message);
});
