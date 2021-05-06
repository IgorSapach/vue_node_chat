<template>
  <b-sidebar id="sidebar-right" title="Users in room" right shadow>
    <b-list-group>
      <b-list-group-item v-for="u in users" :key="u.id">
        <b-avatar
          variant="primary"
          :text="u.name.slice(0, 1)"
          class="align-baseline"
        ></b-avatar>
        {{ u.name }}
      </b-list-group-item>
    </b-list-group>
  </b-sidebar>
</template>
<script>
export default {
  computed: {
    users() {
      return this.$store.getters["users"];
    },
  },
};
</script>
