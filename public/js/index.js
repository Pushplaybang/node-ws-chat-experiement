var socket = io();
socket.on('connect', function() {
  console.log('connect');
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('new message', message);

  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
});

// avert your eyes!
$(document).ready(function() {
  console.log('hello from jQ');
  $('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
      from: 'me',
      text: $('[name=message]').val(),
    }, (result) => {
      console.log('got it!', result);
    });
  })
});