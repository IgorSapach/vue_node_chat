import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

import "../public/main.scss";

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const socketConnection = SocketIO("http://localhost:3000");

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: socketConnection,
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);

Vue.use(BootstrapVue).use(BootstrapVueIcons)


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
