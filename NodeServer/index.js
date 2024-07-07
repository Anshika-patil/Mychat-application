//node server that will handle all the socket.io connection
const io= require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{
    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
    socket.on('new-user-joined', username =>{
       /*console.log("New user",username);*/
        users[socket.id] = username;
        socket.broadcast.emit('user-joined', username);
    });

    socket.on('send', message=>{
        socket.broadcast.emit('receive',{message: message , username: users[socket.id]})
    });

    socket.on('disconnect', message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });
})