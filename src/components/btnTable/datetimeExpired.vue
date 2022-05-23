<template>
  <div>
    <div v-if="mExpried >= 2" class="green--text">
      {{ new Date(mDate).toISOString().slice(0, 10) }}
    </div>
    <div v-else class="red--text">
      <v-icon dense color="red">mdi-clock-outline</v-icon>
      {{ new Date(mDate).toISOString().slice(0, 10) }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    mDate: String,
    mExpried: Number,
  },
};
</script>
<style></style>
