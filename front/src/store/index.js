import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: "",
      userName: "",
    },
    room: "",
  },
  getters: {
    user: (state) => state.user,
    room: (state) => state.room,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserRoom(state, room) {
      state.room = room;
    },
  },
  actions: {
    enterRoom({ state }, roomName) {
      this.$socket.emit("enterRoom", { userId: state.user.id, room: roomName });
    },
  },
  modules: {},
});
