<template>
  <div>
    <v-switch
      class="ma-n2"
      color="red"
      v-model="state"
      @change="onChange"
    ></v-switch>
  </div>
</template>
<script>
export default {
  props: {
    mStatus: String,
    mId: Number,
  },
  data() {
    return {
      state: null,
      status: null,
    };
  },
  created() {
    if (this.mStatus == "active") {
      this.state = true;
      this.status = "inactive";
    } else {
      this.state = false;
      this.status = "active";
    }
  },
  methods: {
    onChange() {
      this.$emit("onSwith", { Id: this.mId, status: this.status });
    },
  },
};
</script>
<style></style>
