var scrollToButton = function() {
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');

  // heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  // scroll if newest message is (or almost) visible
  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

var deparam = function(uri) {
  if(uri === undefined){
    uri = window.location.search;
  }
  var queryString = {};
  uri.replace(
    new RegExp(
      "([^?=&]+)(=([^&#]*))?", "g"),
    function($0, $1, $2, $3) {
      queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
    }
  );
  return queryString;
};

var socket = io();
socket.on('connect', function() {
  console.log('connect');
  var params = deparam(window.location.search);
  console.log(params);
  socket.emit('join', params, function(err) {
    if (err) {
      alert('room and name are required.');
      window.location.href ='/';
      return;
    }

  })
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('new message', message);

  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);

  scrollToButton();
});

socket.on('newLocationMessage', function(message) {
  console.log('new message', message);

  var li = $('<li></li>');
  var anchor = $('<a target="_blank">View on Google Maps</a>');
  li.text(`${message.from} sent their location: `);
  anchor.attr('href', message.url);
  li.append(anchor);
  $('#messages').append(li);

  scrollToButton();
});

// avert your eyes!
$(document).ready(function() {
  console.log('hello from jQ');
  $('#message-form').on('submit', function(e) {
    e.preventDefault();
    var message = $('[name=message]').val();
    if (!message) {
      return;
    }

    socket.emit('createMessage', {
      from: 'me',
      text: message,
    }, (result) => {
      $('[name=message]').val('')
    });
  })

  var locationButton = $('#send-location');
  locationButton.on('click', function(e) {
    if (!navigator.geolocation) {
      return alert('geolocation not available');
    }

    locationButton.attr('disabled', true).text('sending...');

    navigator.geolocation.getCurrentPosition(function(location) {
      locationButton.removeAttr('disabled').text('Send Location ->');
      socket.emit('createLocationMessage', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }, function() {
      locationButton.removeAttr('disabled').text('Send Location ->');
      alert('cannot get current location');
    })
  })
});