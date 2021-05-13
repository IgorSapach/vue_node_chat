const users = require('./users')()
const rooms = require('./rooms')()

module.exports = function (socket) {
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
  return false
}