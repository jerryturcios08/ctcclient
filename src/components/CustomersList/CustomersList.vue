<template>
  <v-list two-line subheader>
    <v-list-item v-for="customer in customers" :key="customer.id">
      <v-list-item-avatar>
        <v-icon :class="[customer.iconClass]">{{ customer.icon }}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          <strong>{{ customer.firstName }} {{ customer.lastName }}</strong>
        </v-list-item-title>
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
          <v-icon color="red" @click="deleteCustomer(customer.id)">delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import axios from "axios";

import apiUrl from "@/api/config";

export default {
  name: "CustomersList",
  props: {
    customers: {
      type: Array,
      default: () => ({
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        socialSecurity: ""
      })
    },
    refreshCustomersList: Function
  },
  methods: {
    deleteCustomer(id) {
      axios
        .delete(`${apiUrl}/api/customers/${id}`)
        .then(() => {
          this.$props.refreshCustomersList();
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  }
};
</script>
