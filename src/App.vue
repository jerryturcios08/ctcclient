<template>
  <v-app>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-card>
        <v-toolbar color="light-blue" light extended>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title class="white--text">Customers</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-view-module</v-icon>
          </v-btn>
          <template v-slot:extension>
            <v-btn fab color="cyan accent-2" bottom left absolute @click="dialog = !dialog">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
        </v-toolbar>
        <v-list two-line subheader>
          <v-list-item v-for="customer in customers" :key="customer.id" link>
            <v-list-item-avatar>
              <v-icon :class="[customer.iconClass]">{{ customer.icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ customer.firstName }} {{ customer.lastName }}</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon>email</v-icon>
                {{ customer.email }}
                <v-spacer></v-spacer>
                <v-icon>phone</v-icon>
                {{ customer.phoneNumber }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="red">delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-text>
              <v-text-field label="File name"></v-text-field>
              <small class="grey--text">* This doesn't actually save.</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="dialog = false">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-col>
  </v-app>
</template>

<script>
import axios from "axios";

import apiUrl from "@/api/config.js";

export default {
  name: "App",
  components: {
    // Customers
  },
  data() {
    return {
      customers: [],
      dialog: false
    };
  },
  mounted() {
    axios
      .get(`${apiUrl}/api/customers`)
      .then(response => {
        this.customers = [...response.data];
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }
};
</script>

<style scoped>
#product-name {
  color: rgb(233, 232, 232);
}
</style>
