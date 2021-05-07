<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col cols="8" v-if="rooms.length > 0">
        <b-list-group>
          <b-list-group v-for="room in rooms" :key="room.name">
            <b-list-group-item
              style="z-index: 1"
              button
              @click="enterRoom(room.name)"
              class="d-flex justify-content-between align-items-center m-1"
            >
              {{ room.name }}
              <div v-if="showDeleteIcons" @click.stop="deleteRoom(room.name)">
                <b-icon
                  icon="dash-circle-fill"
                  scale="2"
                  class="delete_button"
                ></b-icon>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-list-group>
      </b-col>
      <b-col v-else cols="10" class="pt-5">
        <h5>
          There are no rooms. Please, if you want to start a correspondence,
          create a room and enter it.
        </h5>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    showDeleteIcons: { type: Boolean, required: true },
  },
  computed: {
    rooms() {
      return this.$store.getters["rooms"];
    },
    userId() {
      return this.$store.getters["user"].id;
    },
  },
  methods: {
    enterRoom(roomName) {
      this.$socket.emit(
        "enterRoom",
        { userId: this.userId, room: roomName },
        (data) => {
          if (typeof data === "string") {
            this.$bvToast.toast(`${data}`, {
              title: `Error`,
              variant: "danger",
              solid: true,
            });
          }
          this.$store.commit("setUserRoom", roomName);
          this.$router.push({ name: "Chat" });
        }
      );
    },
    deleteRoom(roomName) {
      this.$socket.emit("deleteRoom", roomName, (data) => {
        this.$bvToast.toast(`${data}`, {
          title: `Error`,
          variant: "danger",
          solid: true,
        });
      });
    },
  },
};
</script>
