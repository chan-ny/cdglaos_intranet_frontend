<template>
  <div class="px-1">
    <v-btn
      elevation="5"
      class="mr-2 font14r cap"
      color="primary"
      dense
      dark
      @click="onAccept"
      >{{ $t("btn.accept") }}</v-btn
    >
  </div>
</template>
<script>
export default {
  methods: {
    onAccept() {
      this.$emit("onAccept");
    },
  },
};
</script>
<style></style>
