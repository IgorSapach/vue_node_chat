import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: "",
      userName: "",
    },
    users: [],
    messages: [],
    rooms: [],
    room: "",
  },
  getters: {
    user: (state) => state.user,
    users: (state) => state.users,
    messages: (state) => state.messages,
    rooms: (state) => state.rooms,
    room: (state) => state.room,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserRoom(state, room) {
      state.room = room;
    },
    SOCKET_newMessage(state, message) {
      state.messages.push(message);
    },
    SOCKET_rooms(state, rooms) {
      state.rooms = rooms;
    },
    SOCKET_updateUsers(state, users) {
      state.users = users;
    },
    clearData(state) {
      state.messages = [];
      state.users = [];
    },
  },
  actions: {
    enterRoom({ state }, roomName) {
      this.$socket.emit("enterRoom", { userId: state.user.id, room: roomName });
    },
  },
  modules: {},
});
