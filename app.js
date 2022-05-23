const express = require('express');
const socketio = require('socket.io');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Orifin, X-Requested-With, Content-Type, Accept');
    next();
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

const server = app.listen(process.env.PORT || 5000, () => {
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