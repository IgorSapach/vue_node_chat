<template>
  <b-container class="card-main">
    <b-row>
      <b-col class="d-flex flex-column">
        <div
          class="message_container"
          :class="{ owner: m.name === user.userName }"
          v-for="m in messages"
          :key="m.data"
          ref="message"
        >
          <div class="message">
            <div class="message_info">{{ m.name }}</div>
            <hr />
            <div class="message_text">{{ m.text }}</div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  computed: {
    user() {
      return this.$store.getters["user"];
    },
  },
  sockets: {
    newMessage: function (message) {
      this.messages.push(message);
    },
  },
  watch: {
    messages() {
      if (this.$refs.message)
        this.$refs.message[this.$refs.message.length - 1].scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
    },
  },
};
</script>
