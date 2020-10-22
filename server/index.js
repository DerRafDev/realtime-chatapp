const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = 5000; // In case of deployment, use this instead: process.env.PORT

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//this is going to be connected as a client side socket
io.on('connection', (socket) => {

    //receiving the acess in the backend from name and room
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
    
        if(error) return callback(error); //this is for error handling

        //this is the welcome message to the user in the chat
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });

        //this method will send a message to everyone besides that user that is entering the room
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` });
        
        socket.join(user.room);

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

        callback();
    });

    //this is for the user send a message in the chat
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message});
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

        callback();
    });


    //this is to know when the user disconnect
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left the room.`})
        }
    })
});

app.use(router);

//just to know if it's in the right port use this
server.listen(PORT , () => console.log(`Server has started on port ${PORT}`)); 

//to start run: npm start 