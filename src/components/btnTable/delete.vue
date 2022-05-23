<template>
  <div>
    <v-btn icon color="red" @click="onDelete">
      <v-icon>mdi-delete-forever</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  methods: {
    onDelete() {
      this.$emit("onDelete");
    },
  },
};
</script>
<style></style>
