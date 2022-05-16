<template>
  <div class="px-2">
    <v-btn
      elevation="5"
      class="mr-2 font14r"
      color="success"
      dense
      dark
      @click="onSubmit"
      >{{ $t("btn.submit") }}</v-btn
    >
  </div>
</template>
<script>
export default {
  methods: {
    onSubmit() {
      this.$emit("onSubmit");
    },
  },
};
</script>
<style></style>
