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

socket.on('newLocationMessage', function(message) {
  console.log('new message', message);

  var li = $('<li></li>');
  var anchor = $('<a target="_blank">View on Google Maps</a>');
  li.text(`${message.from} sent their location: `);
  anchor.attr('href', message.url);
  li.append(anchor);
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

  var locationButton = $('#send-location');
  locationButton.on('click', function(e) {
    if (!navigator.geolocation) {
      return alert('geolocation not available');
    }

    navigator.geolocation.getCurrentPosition(function(location) {
      socket.emit('createLocationMessage', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    }, function() {
      alert('cannot get current location')
    })
  })
});