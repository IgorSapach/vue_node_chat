<template>
  <b-container>
    <AddingRoomModal />
    <b-row>
      <b-col>
        <b-card title="Сhat room list" class="mb-2">
          <Buttons @setShowDeleteIcons="showDeleteIcons = !showDeleteIcons" />
          <b-row class="d-flex justify-content-center">
            <RoomList :showDeleteIcons="showDeleteIcons" :rooms="rooms" />
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AddingRoomModal from "../components/room/AddingRoom";
import RoomList from "../components/room/RoomList";
import Buttons from "../components/room/Buttons";

export default {
  data() {
    return {
      showDeleteIcons: false,
      rooms: [],
    };
  },
  components: {
    AddingRoomModal,
    RoomList,
    Buttons,
  },
  sockets: {
    rooms: function (data) {
      this.rooms = data;
    },
  },
};
</script>
