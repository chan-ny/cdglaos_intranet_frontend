<template>
  <div>
    <v-btn icon color="orange" @click="onUpdate">
      <v-icon>mdi-file-document-edit</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  methods: {
    onUpdate() {
      this.$emit("onUpdate");
    },
  },
};
</script>
<style></style>
