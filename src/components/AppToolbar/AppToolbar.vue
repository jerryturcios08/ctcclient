<template>
  <v-toolbar color="light-blue" light extended>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title class="white--text">Customers</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon @click="refreshCustomersList">
      <v-icon>refresh</v-icon>
    </v-btn>
    <template v-slot:extension>
      <v-btn fab color="cyan accent-2" bottom left absolute @click="showCreateDialog">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  name: "AppToolbar",
  props: {
    refreshCustomersList: Function,
    showCreateDialog: Function
  }
};
</script>
