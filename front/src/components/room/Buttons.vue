<template>
  <b-container>
    <b-row class="mb-3">
      <b-col class="d-flex justify-content-end">
        <b-button variant="danger" class="mr-2" @click="setShowDeleteIcons">
          Delete room
        </b-button>
        <b-button
          variant="outline-primary"
          class="mr-2"
          v-b-modal.adding-room-modal
        >
          Add room
        </b-button>
        <b-button variant="primary" @click="LogOut">LogOut</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  methods: {
    setShowDeleteIcons() {
      this.$emit("setShowDeleteIcons");
    },
    LogOut() {
      this.$store.commit("clearData");
      this.$store.commit("setUser", { id: "", userName: "" });
      this.$router.push({ name: "Auth" });
    },
  },
};
</script>
