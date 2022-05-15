<template>
  <div>
    <template v-if="$route.meta.allowAccess == false">
      <v-app>
        <v-main>
          <router-view />
        </v-main>
      </v-app>
    </template>
    <template v-else>
      <v-app>
        <Navigation-Drawer />
        <v-main>
          <router-view />
        </v-main>
      </v-app>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import i18n from "./i18n";
export default {
  name: "App",
  computed: {
    ...mapState(["token", "isUserLogin", "language"]),
  },
  mounted() {
    if (this.isUserLogin == false) {
      this.$router.push({
        name: "LoginPage",
      });
    } else {
      i18n.locale = this.language;
    }
  },
  watch: {
    isUserLogin() {
      if (this.isUserLogin == false) {
        this.$router.push({
          name: "LoginPage",
        });
      }
    },
    language() {
      i18n.locale = this.language;
    },
  },
};
</script>
