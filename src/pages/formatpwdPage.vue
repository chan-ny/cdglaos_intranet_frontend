<template>
  <div>
    <v-row justtify="center">
      <v-col>
        <v-card class="mx-auto login" max-width="400" elevation="8">
          <div class="text-center pt-4 font25b blue--text">
            {{ $t("text.titleNewpwd") }}
          </div>
          <v-card-text class="px-6">
            <v-form class="font14r">
              <v-text-field
                v-model="mPassword"
                :type="mShowpasswordOne ? 'text' : 'password'"
                name="password"
                solo
                :label="this.$t('txtfield.password')"
                :append-icon="mShowpasswordOne ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="mShowpasswordOne = !mShowpasswordOne"
                required
                :rules="mRule.password"
              >
                <template slot="prepend-inner">
                  <v-icon size="30">mdi-key</v-icon>
                </template>
              </v-text-field>
              <v-text-field
                v-model="mPasswordValid"
                :type="mShowpasswordTwo ? 'text' : 'password'"
                name="password"
                solo
                :label="this.$t('txtfield.password')"
                :append-icon="mShowpasswordTwo ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="mShowpasswordTwo = !mShowpasswordTwo"
                required
                :error-messages="PasswordError"
                :rules="mRule.passwordValid"
              >
                <template slot="prepend-inner">
                  <v-icon size="30">mdi-key-chain</v-icon>
                </template>
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="px-6 pb-6 font14r">
            <v-btn
              block
              elevation="6"
              color="#1c4587"
              class="rounded-lg"
              dense
              dark
              >{{ $t("btn.submit") }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mShowpasswordOne: false,
      mShowpasswordTwo: false,
      mPassword: "",
      mPasswordValid: "",
      mRule: {
        password: [
          (value) => !!value || this.$t("validate.require"),
          (value) =>
            (value && value.length <= 30) || this.$t("validate.password"),
        ],
        passwordValid: [
          (value) => !!value || this.$t("validate.require"),
          (value) =>
            (value && value.length <= 30) || this.$t("validate.password"),
        ],
      },
    };
  },
  methods: {
    onFormatPassword() {
      this.dDialog = true;
    },
  },
  computed: {
    PasswordError() {
      const error = [];
      if (this.mPassword != this.mPasswordValid) {
        error.push("passwrd is Invalid");
      }
      return error;
    },
  },
};
</script>
<style></style>
