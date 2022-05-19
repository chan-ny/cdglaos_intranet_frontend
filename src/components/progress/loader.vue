<template>
  <div>
    <div class="text-center">
      <v-overlay :value="overlay">
        <v-progress-circular
          indeterminate
          size="150"
          width="10"
          color="yellow"
        ></v-progress-circular>
      </v-overlay>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    overlay: Boolean,
  },
};
</script>
<style></style>
