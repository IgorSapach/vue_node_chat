class Rooms {
  constructor() {
    this.rooms = []
  }

  add(room) {
    this.rooms.push(room)
  }

  get() {
    return this.rooms
  }

  remove(name) {
    this.rooms = this.rooms.filter(room => room.name !== name)
  }
}

module.exports = function () {
  return new Rooms()
}