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
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
