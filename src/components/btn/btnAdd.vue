<template>
  <div class="px-2">
    <v-btn
      elevation="5"
      class="mr-2 font16r"
      :color="color"
      tile
      dense
      dark
      @click="onAdd"
      >{{ title }}</v-btn
    >
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    color: String,
  },
  methods: {
    onAdd() {
      this.$emit("onAdd");
    },
  },
};
</script>
<style></style>
