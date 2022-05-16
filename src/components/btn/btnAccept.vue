<template>
  <div class="px-1">
    <v-btn
      elevation="5"
      class="mr-2 font14r cap"
      color="primary"
      dense
      dark
      :loading="loading"
      @click="onAccept"
      >{{ $t("btn.accept") }}</v-btn
    >
  </div>
</template>
<script>
export default {
  props: {
    loading: Boolean,
  },
  methods: {
    onAccept() {
      this.$emit("onAccept");
    },
  },
};
</script>
<style></style>
