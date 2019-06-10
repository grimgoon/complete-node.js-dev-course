const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'));

let count = 0;

io.on('connection', (socket) => {
    console.log('New Web Socket Connection');
    socket.emit('countUpdated', count);

    socket.on('increment', () => {
        count++;
        // Single user
        //socket.emit('countUpdated', count);

        // Every connection available:
        io.emit('countUpdated', count);
    });
});


server.listen(port, () => {
    console.log('Server is up on port ' + port);
});