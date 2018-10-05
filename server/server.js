const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

  const { generateMessage } = require('./utils/message');


const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket) => {
  socket.emit('newMessage',generateMessage('Admin', 'welcome!'));
  socket.broadcast.emit('newMessage', generateMessage('Admin',  'new user joined!'));


  socket.on('disconnect', () => {
    console.log('user was disconnected');
  });

  socket.on('createMessage', (message) => {

    // broadcasts to all connections
    socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
  });
});


server.listen(3000, () => {
  console.log('server running on port 3000');
});