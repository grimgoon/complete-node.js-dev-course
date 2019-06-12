const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');
const {generateMessage, generateLocationMessage} = require('./utils/messages');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users');

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New Web Socket Connection');

    socket.on('join', ({username, room}, callback) => {
        const {error, user} = addUser({id: socket.id, username, room});

        if(error) {
            return callback(error);
        }

        socket.join(user.room);

        socket.emit('message', generateMessage('Welcome!'));
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`));
    
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();
        

        if(filter.isProfane(message)) {
            return callback('Profanity is not allowed');
        }
        
        io.emit('message',     generateMessage(message));
        callback();

    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', generateMessage(`${user.username} has left`));
        }
    });

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps/?q=${coords.latitude},${coords.longitude}`))
        callback();
    });


});

server.listen(port, () => {
    console.log('Server is up on port ' + port);
});