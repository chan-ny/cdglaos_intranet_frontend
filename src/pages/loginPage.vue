<template>
  <div>
    <v-row justtify="center">
      <v-col>
        <v-card class="mx-auto login" max-width="400" elevation="8">
          <div class="text-right">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon color="red">mdi-translate</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  @click="onChangeLanguage(item)"
                >
                  <v-list-item-title class="font16r">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="text-center mt-n6">
            <v-avatar class="ma-3" size="85">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </div>
          <div class="text-center font25b blue--text">
            {{ $t("text.titleLogin") }}
          </div>
          <v-card-text class="px-6">
            <v-form
              class="font14r"
              ref="form"
              lazy-validation
              @submit.prevent="onLogin"
            >
              <v-text-field
                v-model="mEmail"
                name="email"
                solo
                :label="this.$t('txtfield.emailandphone')"
                :rules="mRule.email"
                required
              >
                <template slot="prepend-inner">
                  <v-icon size="30">mdi-email-check-outline</v-icon>
                </template>
              </v-text-field>
              <v-text-field
                v-model="mPassword"
                :type="mShowpassword ? 'text' : 'password'"
                name="password"
                solo
                :label="this.$t('txtfield.password')"
                :append-icon="mShowpassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="mShowpassword = !mShowpassword"
                required
                :rules="mRule.password"
              >
                <template slot="prepend-inner">
                  <v-icon size="30">mdi-lock-check-outline</v-icon>
                </template>
              </v-text-field>
              <div
                class="text-center red--text mt-n6 font16r"
                v-if="mWorning == true"
              >
                {{ $t("validate.worning") }}
              </div>
              <v-card-actions class="px-2 font14r">
                <v-btn
                  type="submit"
                  block
                  elevation="6"
                  color="#1c4587"
                  class="rounded-lg"
                  dense
                  dark
                  >{{ $t("text.titleLogin") }}</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card-text>
          <div
            class="text-right mr-6 mt-2 pb-6 font16r text-decoration-underline"
          >
            <a @click="onFormatPassword"> {{ $t("text.formatPassowrd") }}</a>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!-- dialog from -->
    <FormatPassword :dialog="dDialog" @onClose="dDialog = !dDialog" />
  </div>
</template>
<script>
import LoginService from "../service/loginService";
import i18n from "../i18n";

export default {
  data() {
    return {
      items: [
        { title: "ລາວ", id: "la" },
        { title: "English", id: "en" },
      ],
      mShowpassword: false,
      mWorning: false,
      mEmail: "",
      mPassword: "",
      dDialog: false,
      mRule: {
        email: [
          (value) => !!value || this.$t("validate.require"),
          (value) => /.+@.+\..+/.test(value) || this.$t("validate.email"),
        ],
        password: [
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
    async onLogin() {
      if (this.$refs.form.validate()) {
        LoginService.login({
          uemail: this.mEmail,
          upassowrd: this.mPassword,
        })
          .then((result) => {
            this.mWorning = false;
            this.$store.dispatch("setToken", result.data.token);
            this.$store.dispatch("setUser", result.data.users);
            this.$store.dispatch("setMenu", result.data.menu);
            this.$router.push({
              name: "HomeView",
            });
            // console.log(result);
          })
          .catch((error) => {
            this.mWorning = true;
            let err = { ...error.response.data };
            console.log(err.msg);
          });
      }
    },
    onChangeLanguage(item) {
      this.$store.dispatch("setLanguage", item.id);
      i18n.locale = item.id;
    },
  },
};
</script>
<style></style>
