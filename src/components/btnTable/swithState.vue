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
    mObject: Object,
  },
  data() {
    return {
      state: null,
    };
  },
  created() {
    if (this.mObject.cpn_state == "active") {
      this.state = true;
    } else {
      this.state = false;
    }
  },
  methods: {
    onChange() {
      this.$emit("onSwith", this.mObject);
    },
  },
};
</script>
<style></style>
