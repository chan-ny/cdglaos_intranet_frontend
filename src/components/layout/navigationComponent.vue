<template>
  <div>
    <v-navigation-drawer
      color="#1c4587"
      :mini-variant.sync="mini"
      permanent
      dark
      app
    >
      <v-list-item class="px-2">
        <v-btn icon @click.stop="mini = !mini">
          <v-icon size="35">mdi-unfold-more-vertical</v-icon>
        </v-btn>
        <v-list-item-title class="ml-3">INTRANETS</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          router
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="font20b">
            <v-list-item-title v-if="state == 'en'">{{
              item.titleENG
            }}</v-list-item-title>
            <v-list-item-title v-else>{{ item.titleLAO }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div>
          <v-btn large block>
            <v-icon>mdi-logout</v-icon>
            <div class="font16r" v-if="mini == false" @click="onLogout">
              {{ $t("text.logout") }}
            </div>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <!-- Tool bar -->
    <Toolbar />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      items: null,
      mini: false,
      state: "",
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$store.dispatch("setMenu", null);
    },
  },
  computed: {
    ...mapState(["menu", "language"]),
  },
  mounted() {
    this.items = this.menu;
    this.state = this.language;
  },
  watch: {
    language() {
      this.state = this.language;
    },
  },
};
</script>
<style></style>
