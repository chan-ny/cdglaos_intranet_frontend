<template>
  <div>
    <v-pagination
      v-model="mPage"
      :length="Math.ceil(mCounts / 20)"
      :total-visible="10"
      circle
    ></v-pagination>
  </div>
</template>
<script>
export default {
  props: {
    mCounts: Number,
  },
  data() {
    return {
      mPage: 1,
    };
  },
  watch: {
    mPage() {
      this.$emit("onPage", this.mPage);
    },
  },
};
</script>
<style></style>
