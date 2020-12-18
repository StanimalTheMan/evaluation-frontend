<template>
  <div>
    <v-toolbar dark>
      <v-toolbar-title class="mt-4">
        GRAYBOOKS
        <v-subheader>Department of Social Sciences</v-subheader>
      </v-toolbar-title>
      <v-btn><router-link to="/dashboard" style="display: inline-block;text-decoration:none;"> Dashboard </router-link></v-btn>
      <v-btn>Your Cadets</v-btn>
      <v-btn>Messages</v-btn>
      <v-btn>Send Message</v-btn>
      <v-btn>Contact</v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
  a { 
    color: #FFF;
  }
</style>
