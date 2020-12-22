<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Logout
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline"
        >You sure you want to log out?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="green darken-1" text @click="logout">
          Logout
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    logout() {
      (this.dialog = false), this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped></style>
