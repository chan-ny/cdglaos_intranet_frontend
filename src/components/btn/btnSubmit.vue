<template>
  <div class="px-2">
    <v-btn
      elevation="5"
      class="mr-2"
      :color="color"
      tile
      dense
      dark
      @click="onSubmit"
      >{{title}}</v-btn
    >
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    color: String
  },
  methods: {
    onSubmit() {
      this.$emit("onSubmit")
    },
  },
};
</script>
<style></style>
