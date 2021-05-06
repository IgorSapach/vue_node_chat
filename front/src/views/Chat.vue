<template>
  <b-container class="main-content">
    <b-card class="h-100vh">
      <b-row class="mb-2 h-95">
        <b-col>
          <b-card :header="room" header-tag="header" class="h-90vh chat_card">
            <template #header>
              <div class="d-flex justify-content-between align-items-center">
                <div class="back_button" @click="goBack">
                  <b-icon icon="arrow-left" scale="2"></b-icon>
                </div>
                <div v-b-toggle.sidebar-right class="info_button">
                  <b-icon icon="info-circle" scale="2" />
                </div>
              </div>
            </template>
            <b-row class="d-flex flex-column overflow-auto">
              <b-col>
                <div
                  id="chat-container"
                  class="message_container"
                  :class="{ owner: m.name === user.userName }"
                  v-for="m in messages"
                  :key="m.data"
                >
                  <div class="message">
                    <div class="message_info">{{ m.name }}</div>
                    <hr />
                    <div class="message_text">{{ m.text }}</div>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="d-flex">
          <b-input v-model="message" @keyup.13="send"></b-input>
          <b-button @click="send" id="tooglebutton">send</b-button>
        </b-col>
      </b-row>
    </b-card>
    <Sidebar />
  </b-container>
</template>

<script>
import Sidebar from "../components/chat/Users";

export default {
  data() {
    return {
      drawer: {},
      message: "",
      chatContainer: {},
    };
  },
  components: {
    Sidebar,
  },
  computed: {
    user() {
      return this.$store.getters["user"];
    },
    messages() {
      return this.$store.getters["messages"];
    },
    room() {
      return this.$store.getters["room"];
    },
  },
  watch: {
    messages() {
      console.log(this.chatContainer);
      this.chatContainer.scrollTop =
        this.chatContainer.scrollHeight - this.chatContainer.clientHeight;
    },
  },
  methods: {
    send() {
      this.$socket.emit(
        "createMessage",
        { text: this.message, id: this.user.id, time: new Date() },
        (data) => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            this.message = "";
          }
        }
      );
    },
    goBack() {
      this.$router.push({ name: "Home" });
    },
  },
  mounted() {
    this.chatContainer = document.getElementById("chat-container");
  },
  beforeDestroy() {
    this.$socket.emit("leaveRoom", this.user);
    this.$store.commit("clearData");
  },
};
</script>
