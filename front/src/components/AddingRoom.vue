<template>
  <b-modal
    id="adding-room-modal"
    title="Adding room form"
    @ok.prevent="addRoom"
    ok-title="Add"
    @hidden="resetModal"
  >
    <b-form @submit.prevent="addRoom" class="mb-2">
      <b-form-group label="Room name:" label-for="room-name" description="">
        <b-form-input
          id="room-name"
          v-model="roomName"
          type="text"
          placeholder="Enter room name"
          required
        >
        </b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      roomName: "",
    };
  },
  methods: {
    addRoom() {
      this.$socket.emit("addRoom", this.roomName, (data) => {
        if (typeof data === "string") {
          this.$bvToast.toast(`${data}`, {
            title: `Error`,
            variant: "danger",
            solid: true,
          });
        } else {
          this.roomName = "";
          this.$bvModal.hide("adding-room-modal");
        }
      });
    },
    resetModal() {
      this.roomName = "";
    },
  },
};
</script>
