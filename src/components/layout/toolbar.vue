<template>
  <div>
    <!-- app Bar -->
    <v-app-bar color="#1c4587" dense dark app>
      <v-spacer></v-spacer>
      <div class="text-right">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-translate</v-icon>
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
    </v-app-bar>
  </div>
</template>
<script>
import i18n from "../../i18n";

export default {
  data() {
    return {
      items: [
        { title: "ລາວ", id: "la" },
        { title: "English", id: "en" },
      ],
    };
  },
  methods: {
    onChangeLanguage(item) {
      this.$store.dispatch("setLanguage", item.id);
      i18n.locale = item.id;
    },
  },
};
</script>
<style></style>
