<template>
  <div>
    <v-btn icon color="blue" @click="onView">
      <v-icon>mdi-file-eye</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  methods: {
    onView() {
      this.$emit("onView");
    },
  },
};
</script>
<style></style>
