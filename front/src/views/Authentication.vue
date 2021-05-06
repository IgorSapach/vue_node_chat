<template>
  <b-container>
    <b-row class="h-100vh">
      <b-col class="d-flex justify-content-center align-items-center h-100">
        <b-card
          title="Node Chat"
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-form @submit="onSubmit">
            <b-form-group
              id="input-group-2"
              label="Your Name:"
              label-for="input-2"
            >
              <b-form-input
                v-model="form.userName"
                type="text"
                id="input-2"
                placeholder="Enter name"
                required
              ></b-form-input>
            </b-form-group>
            <b-button class="w-100" type="submit" variant="primary">
              Enter
            </b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: "",
        userName: "",
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$socket.emit("login", this.form, (data) => {
        if (typeof data === "string") {
          this.$bvToast.toast(`${data}`, {
            title: `Error`,
            variant: "danger",
            solid: true,
          });
        } else {
          this.form.id = data.userId;
          this.$store.commit("setUser", this.form);
          this.$router.push({ name: "Home" });
        }
      });
    },
  },
};
</script>
