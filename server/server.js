const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isString } = require('./utils/validation');
const { Users } = require('./utils/Users');

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));
io.on('connection', (socket) => {

  socket.on('join', function(params, callback) {
    users.removeUser(socket.id);

    const { name, room } = params;
    if (!isString(name) || !isString(room)) {
      return callback(true);
    }

    socket.join(room);
    users.addUser({id: socket.id, name, room });

    console.log('all: ', users.users);
    console.log('room: ', room);
    console.log('name: ', name);
    console.log('room users: ', users.list(room));

    io.to(room).emit('updateUserList', users.list(room));
    socket.emit('newMessage',generateMessage('System', `welcome ${name}!`));
    socket.broadcast.to(room).emit('newMessage', generateMessage('System',  `new user ${name} joined ${room}!`));
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.list(user.room));
      io.to(user.room).emit('newMessage', generateMessage('System',  `new user ${user.name} left ${user.room}!`));
    }
  });

  socket.on('createMessage', (message, callback) => {
    // handle error
    if (callback && typeof(callback) === 'function') {
      callback({
        confirmation: true,
      });
    }

    const user = users.getUser(socket.id);

    // broadcasts to all connections
    io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
  });

  socket.on('createLocationMessage', (message) => {
    const user = users.getUser(socket.id);

    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, message.latitude, message.longitude))
  })
});


server.listen(3000, () => {
  console.log('server running on port 3000');
});