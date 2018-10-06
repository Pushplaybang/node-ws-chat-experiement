const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isString } = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket) => {

  socket.on('join', function(params, callback) {
    const { name, room } = params;
    if (!isString(name) || !isString(room)) {
      return callback(true);
    }

    socket.emit('newMessage',generateMessage('System', `welcome ${name}!`));
    socket.broadcast.to(room).emit('newMessage', generateMessage('System',  `new user ${name} joined ${room}!`));
  });

  socket.on('disconnect', () => {
    console.log('user was disconnected');
  });

  socket.on('createMessage', (message, callback) => {
    if (callback && typeof(callback) === 'function') {
      callback({
        confirmation: true,
      });
    }

    // broadcasts to all connections
    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('createLocationMessage', (message) => {
    io.emit('newLocationMessage', generateLocationMessage('someone', message.latitude, message.longitude))
  })
});


server.listen(3000, () => {
  console.log('server running on port 3000');
});