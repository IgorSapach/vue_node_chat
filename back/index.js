const app = require('express')();
const http = require('http').Server(app)
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});
const users = require('./users')()
const rooms = require('./rooms')()

const m = (name, text, time, id) => ({ name, text, time, id })

io.on('connection', socket => {

  socket.on("login", (data, cb) => {
    if (!data.userName) {
      return cb('something wrong')
    }

    if (users.users.length > 0) {
      const userIsExist = users.users.find(user => user.name.toUpperCase() === data.userName.toUpperCase())
      if (userIsExist) return cb('This name is already exist')
    }
    users.add({
      id: socket.id,
      name: data.userName,
      room: ''
    })

    cb({ userId: socket.id })
    socket.emit('rooms', rooms.get())
  })

  socket.on('createMessage', (data, cb) => {
    if (!data.text) {
      return cb('textarea is empty')
    }
    const user = users.get(data.id)
    if (user) {
      io.to(user.room).emit('newMessage', m(user.name, data.text, data.time, data.id))

    }
    cb()
  })

  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user) {
      socket.broadcast.to(user.room).emit('newMessage', m('system', `user ${user.name} has left`, new Date))
      updateUsers(user.room, users.getByRoom(user.room))
    }
  })

  socket.on('addRoom', (roomName, cb) => {
    if (!roomName) return cb('room name is empty')
    if (rooms.get().find(x => x.name === roomName)) {
      return cb('This room name already exists')
    }
    rooms.add({
      name: roomName,
    })
    io.emit('rooms', rooms.get())
    cb()
  })

  socket.on('enterRoom', (data, cb) => {
    const user = users.get(data.userId)
    const room = rooms.get(data.room).find(room => data.room === room.name)
    if (user && room) {
      const result = users.setRoom(user.id, room.name)
      if (result) {
        socket.join(result.room)
        cb(result)
        socket.emit("newMessage", m('system', `welcome ${result.name}`, new Date))
        updateUsers(result.room, users.getByRoom(result.room))
        socket.broadcast.to(result.room).emit('newMessage', m('system', `user ${result.name} enter`, new Date))
      }
    }
    cb('something wrong')
  })
  socket.on('leaveRoom', (data, cb) => {
    if (data) {
      const user = users.get(data.id)
      if (user) {
        socket.broadcast.to(user.room).emit('newMessage', m('system', `user ${user.name} has left`, new Date))
        const usersInRoom = users.getByRoom(user.room)
        socket.leave(user.room)
        updateUsers(user.room, usersInRoom.filter(x => x.id !== user.id))
        users.setRoom(data.id, '')
      }
    }
  })
  socket.on('deleteRoom', (roomName, cb) => {
    if (!roomName) {
      return cb("something went wrong")
    }
    if (users.getByRoom(roomName).length !== 0) {
      return cb('Room is not empty')
    }
    rooms.remove(roomName)
    socket.emit('rooms', rooms.get())
  })
  function updateUsers(room, users) {
    io.to(room).emit("updateUsers", users)
  }

})

http.listen(process.env.PORT || 3000, () => { console.log(`listening ${process.env.PORT || 3000}`) })
