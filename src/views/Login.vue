<template>
  <v-card>
    <v-text-field v-model="username" label="username" required></v-text-field
    ><!--should add validation-->
    <v-text-field v-model="password" label="password" required></v-text-field>
    <v-btn @click="login">Log in</v-btn>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push(this.$route.query.redirect);
        });
    },
  },
};
</script>

<style scoped></style>
