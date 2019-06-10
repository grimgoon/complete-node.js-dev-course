const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New Web Socket Connection');

    socket.emit('message', 'Welcome!');

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    });
});

server.listen(port, () => {
    console.log('Server is up on port ' + port);
});