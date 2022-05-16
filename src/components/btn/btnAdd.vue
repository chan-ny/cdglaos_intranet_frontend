<template>
  <div class="px-1">
    <v-btn
      elevation="5"
      class="mr-2 font16r cap"
      color="success"
      tile
      dense
      dark
      @click="onAdd"
      >{{ $t("btn.submit") }}</v-btn
    >
  </div>
</template>
<script>
export default {
  methods: {
    onAdd() {
      this.$emit("onAdd");
    },
  },
};
</script>
<style></style>
