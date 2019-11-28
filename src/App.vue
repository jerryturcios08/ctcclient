<template>
  <v-app>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-card>
        <AppToolbar
          :refreshCustomersList="refreshCustomersList"
          :showCreateDialog="showCreateDialog"
        />
        <CustomersList :customers="customers" :refreshCustomersList="refreshCustomersList" />
        <CreateDialog
          :dialog="dialog"
          :hideCreateDialog="hideCreateDialog"
          :refreshCustomersList="refreshCustomersList"
        />
        <v-snackbar v-model="snackbar">
          The customers list has been refreshed
          <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-card>
    </v-col>
  </v-app>
</template>

<script>
import axios from "axios";

import apiUrl from "@/api/config";
import AppToolbar from "@/components/AppToolbar";
import CreateDialog from "@/components/CreateDialog";
import CustomersList from "@/components/CustomersList";

export default {
  name: "App",
  components: {
    AppToolbar,
    CreateDialog,
    CustomersList
  },
  data() {
    return {
      customers: [],
      dialog: false,
      snackbar: false
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
  },
  methods: {
    hideCreateDialog() {
      this.dialog = false;
    },
    refreshCustomersList() {
      axios
        .get(`${apiUrl}/api/customers`)
        .then(response => {
          this.customers = [...response.data];
          this.snackbar = true;
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
    showCreateDialog() {
      this.dialog = true;
    }
  }
};
</script>
