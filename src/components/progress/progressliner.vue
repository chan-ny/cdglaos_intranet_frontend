<template>
  <div class="text-center mb-n3">
    <v-progress-linear
      striped
      height="10"
      :active="loading"
      :indeterminate="loading"
      color="deep-purple accent-4"
    ></v-progress-linear>
  </div>
</template>
<script>
export default {
  props: {
    loading: Boolean,
  },
};
</script>
<style></style>
