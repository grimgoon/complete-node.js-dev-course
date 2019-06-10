const socket = io();

socket.on('message', (message1) => {
    console.log(message1);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    socket.emit('sendMessage', message);
});
