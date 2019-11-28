<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title>Create a new customer</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" :lazy-validation="lazy">
          <v-text-field v-model="firstName" :rules="nameRules" label="First name" required></v-text-field>
          <v-text-field v-model="lastName" :rules="nameRules" label="Last name" required></v-text-field>
          <v-text-field v-model="email" :rules="emailRules" label="email" required></v-text-field>
          <v-text-field v-model="phoneNumber" :rules="nameRules" label="Phone number" required></v-text-field>
          <v-text-field
            v-model="socialSecurity"
            :rules="nameRules"
            label="Social security"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary" @click="closeDialog">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="createNewCustomer">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

import apiUrl from "@/api/config";

export default {
  name: "CreateDialog",
  props: {
    dialog: Boolean,
    hideCreateDialog: Function,
    refreshCustomersList: Function
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      nameRules: [
        v => !!v || "Field is required",
        v =>
          (v && v.length <= 255) || "Content must be less than 255 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      phoneNumber: "",
      socialSecurity: "",
      valid: true,
      lazy: false
    };
  },
  methods: {
    createNewCustomer() {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      if (this.valid) {
        axios
          .post(
            `${apiUrl}/api/customers`,
            {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              phoneNumber: this.phoneNumber,
              socialSecurity: this.socialSecurity
            },
            config
          )
          .then(() => {
            this.$props.refreshCustomersList();
            this.closeDialog();
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
          });
      }
    },
    closeDialog() {
      this.$refs.form.reset();
      this.$props.hideCreateDialog();
    }
  }
};
</script>
