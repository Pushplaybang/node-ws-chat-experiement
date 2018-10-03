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
  console.log('new user connected');

  socket.on('disconnect', () => {
    console.log('user was disconnected');
  });

  socket.on('createMessage', (message) => {
    console.log('created a message', message);
    // broadcasts to all connections
    io.emit('newMessage', {
      ...message,
      createdAt: new Date(),
    });
  });
});


server.listen(3000, () => {
  console.log('server running on port 3000');
});