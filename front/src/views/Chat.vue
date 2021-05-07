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
            <MessagesArea />
          </b-card>
        </b-col>
      </b-row>
      <b-row> <MessageSendArea /> </b-row>
    </b-card>
    <Sidebar />
  </b-container>
</template>

<script>
import Sidebar from "../components/chat/Users";
import MessagesArea from "../components/chat/MessagesArea";
import MessageSendArea from "../components/chat/MessageSendArea";

export default {
  components: {
    Sidebar,
    MessagesArea,
    MessageSendArea,
  },
  computed: {
    user() {
      return this.$store.getters["user"];
    },
    room() {
      return this.$store.getters["room"];
    },
  },
  methods: {
    goBack() {
      this.$router.push({ name: "Home" });
    },
  },
  beforeDestroy() {
    this.$socket.emit("leaveRoom", this.user);
    this.$store.commit("clearData");
  },
};
</script>
