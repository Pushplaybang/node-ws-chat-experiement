const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket) => {
  socket.emit('newMessage', {
    from: 'Admin',
    message: 'welcome!',
  });
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    message: 'new user joined!',
  });


  socket.on('disconnect', () => {
    console.log('user was disconnected');
  });

  socket.on('createMessage', (message) => {

    // broadcasts to all connections
    socket.broadcast.emit('newMessage', {
      ...message,
      createdAt: new Date().getTime(),
    });
  });
});


server.listen(3000, () => {
  console.log('server running on port 3000');
});