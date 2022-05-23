(function connect() {
    let socket = io.connect('https://messagejs.herokuapp.com/');

    let username = document.querySelector('#username');
    let usernamebtn = document.querySelector('#usernamebtn');
    let curusername = document.querySelector('#curluser');

    usernamebtn.addEventListener('click', e => {
        socket.emit('change_username', { username: username.value });
        curusername.textContent = username.value;
        username.value = '';
    });

    let message = document.querySelector('#message');
    let messagebtn = document.querySelector('#messagebtn');
    let messagebox = document.querySelector('#messagebox');

    messagebtn.addEventListener('click', e => {
        socket.emit('new_message', { message: message.value });
        message.value = '';
    })

    socket.on('recive_message', data => {
        let listitem = document.createElement('li');
        listitem.textContent = data.username + ': ' + data.message;
        listitem.classList.add('list-group-item');
        messagebox.appendChild(listitem);
    });

})();