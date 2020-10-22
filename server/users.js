/*
    In this file, it's going to create helper functions that are going to help
    manage users and manager users joining in, signing out, removing users,
    getting users, adding users, keeping track of what users are in what
    rooms, etc.
*/

const users = [];

const addUser = ({ id, name, room }) => {

    // this is for joining the name, like: Der Raf = derraf
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
  
    const existingUser = users.find((user) => user.room === room && user.name === name);
  
    if(!name || !room) return { error: 'Nickname and room are required.' };
    if(existingUser) return { error: 'Nickname is already been using.' };
  
    const user = { id, name, room };
  
    users.push(user);
    
    return { user };
}

const removeUser = (id) => {
    // finding the user id
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

//finding a user by his id
const getUser = (id) => users.find((user) => user.id === id);

//getting all the users in the room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };