<template>
  <div class="px-1">
    <v-btn
      elevation="5"
      class="mr-2 font14r cap"
      color="success"
      dense
      dark
      @click="onAdd"
      >{{ $t("btn.add") }}</v-btn
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
