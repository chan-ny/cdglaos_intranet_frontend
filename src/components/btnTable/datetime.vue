<template>
  <div>
    <span>{{ new Date(mDate).toISOString().slice(0, 10) }}</span>
  </div>
</template>
<script>
export default {
  props: {
    mDate: String,
  },
};
</script>
<style></style>
