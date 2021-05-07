<template>
  <b-col class="d-flex">
    <b-input v-model="message" @keyup.13="send"></b-input>
    <b-button @click="send" id="tooglebutton">send</b-button>
  </b-col>
</template>
<script>
export default {
  data() {
    return {
      message: "",
    };
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
  },
};
</script>
