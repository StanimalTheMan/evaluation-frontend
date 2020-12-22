<template>
  <div>
    <v-toolbar dark>
      <v-toolbar-title class="mt-4">
        GRAYBOOKS
        <v-subheader>Department of Social Sciences</v-subheader>
      </v-toolbar-title>
      <v-btn
        ><router-link
          to="/dashboard"
          style="display: inline-block;text-decoration:none;"
        >
          Dashboard
        </router-link></v-btn
      >
      <v-btn>Your Cadets</v-btn>
      <v-btn>Messages</v-btn>
      <v-btn>Send Message</v-btn>
      <v-btn>Contact</v-btn>
      <v-btn v-if="!isAuthenticated"
        ><router-link to="/login">Login</router-link></v-btn
      >
      <logout v-else></logout>
    </v-toolbar>
  </div>
</template>

<script>
import Logout from "./Logout";

export default {
  components: {
    Logout,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.getIsAuthenticated;
    },
  },
};
</script>

<style scoped>
a {
  color: #fff;
}
</style>
