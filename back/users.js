class Users {
  constructor() {
    this.users = []
  }

  add(user) {
    this.users.push(user)
  }
  get(id) {
    return this.users.find(x => x.id === id)
  }
  remove(id) {
    const user = this.get(id)
    if (user) {
      this.users = this.users.filter(user => user.id !== id)
    }
    return user
  }
  getByRoom(room) {
    return this.users.filter(user => user.room === room)
  }
  setRoom(userId, roomName) {
    const user = this.get(userId)
    if (user) {
      const userIndex = this.users.findIndex(x => x.id === userId)
      if (userIndex >= 0) {
        this.users[userIndex].room = roomName
        return this.users[userIndex]
      }
      return
    }
  }
}

module.exports = function () {
  return new Users()
}