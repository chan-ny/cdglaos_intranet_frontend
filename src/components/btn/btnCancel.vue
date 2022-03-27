<template>
  <div class="px-2">
    <v-btn
      elevation="5"
      class="mr-2 font14r"
      color="red"
      dense
      dark
      @click="onCancel"
      >{{$t('btn.cancel')}}</v-btn
    >
  </div>
</template>
<script>
export default {
  methods: {
    onCancel() {
      this.$emit("onCancel")
    },
  },
};
</script>
<style></style>
