<template>
  <div class="px-1">
    <v-btn
      elevation="5"
      class="mr-2 font14r cap"
      color="red"
      dense
      dark
      @click="onCancel"
      >{{ $t("btn.cancel") }}</v-btn
    >
  </div>
</template>
<script>
export default {
  methods: {
    onCancel() {
      this.$emit("onCancel");
    },
  },
};
</script>
<style></style>
