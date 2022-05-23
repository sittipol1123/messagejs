const express = require('express');
const socketio = require('socket.io');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

const server = app.listen(process.env.port || 3000, () => {
    console.log('port is running in port 3000');
});

const io = socketio(server);
io.on('connection', (socket) => {
    console.log('new user connect');

    socket.username = "guest";

    socket.on("change_username", data => {
        socket.username = data.username
    });

    socket.on("new_message", data => {
        console.log('new message');
        io.sockets.emit('recive_message', { message: data.message, username: socket.username });
    })
});