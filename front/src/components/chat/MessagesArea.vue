<template>
  <b-container>
    <b-row class="d-flex flex-column overflow-auto">
      <b-col>
        <div
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
  </b-container>
</template>

<script>
export default {
  computed: {
    messages() {
      return this.$store.getters["messages"];
    },
    user() {
      return this.$store.getters["user"];
    },
  },
};
</script>
