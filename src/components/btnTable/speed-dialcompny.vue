<template>
  <div>
    <v-speed-dial
      v-model="fab"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn small v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-dots-horizontal</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="purple darken-1">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
      <v-btn fab dark small color="green" @click="onSync">
        <v-icon>mdi-sync</v-icon>
      </v-btn>
      <v-btn fab dark small color="orange" @click="onEdit">
        <v-icon>mdi-file-document-edit</v-icon>
      </v-btn>
      <v-btn fab dark small color="red" @click="onDelete">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>
<script>
export default {
  data() {
    return {
      direction: "left",
      fab: false,
      hover: false,
      tabs: null,
      transition: "slide-y-reverse-transition",
    };
  },
  methods: {
    onSync() {
      this.$emit("onSync");
    },
    onEdit() {
      this.$emit("onEdit");
    },
    onDelete() {
      this.$emit("onDelete");
    },
  },
};
</script>
<style></style>
