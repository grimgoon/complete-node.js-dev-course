const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New Web Socket Connection');

    socket.emit('message', 'Welcome!');
    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();
        

        if(filter.isProfane(message)) {
            return callback('Profanity is not allowed');
        }
        
        io.emit('message', message);
        callback();

    });

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left');        
    });

    socket.on('sendLocation', (coords, callback) => {
        console.log(coords);
        io.emit('message', `https://google.com/maps/?q=${coords.latitude},${coords.longitude}`)
        callback();
    }); 
});

server.listen(port, () => {
    console.log('Server is up on port ' + port);
});