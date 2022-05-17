<template>
  <div class="px-1">
    <v-btn
      elevation="5"
      class="mr-2 font14r cap"
      color="warning"
      dense
      dark
      @click="onEdit"
      >{{ $t("btn.edit") }}</v-btn
    >
  </div>
</template>
<script>
export default {
  methods: {
    onEdit() {
      this.$emit("onEdit");
    },
  },
};
</script>
<style></style>
