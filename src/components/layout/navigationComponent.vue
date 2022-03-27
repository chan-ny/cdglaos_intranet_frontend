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
        <v-list-item-title class="ml-3">CDGLAOS</v-list-item-title>
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

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Tool bar -->
    <Toolbar />
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [{ title: "Home", icon: "mdi-home-city", route: "/" }],
      mini: true,
    };
  },
};
</script>
<style></style>
