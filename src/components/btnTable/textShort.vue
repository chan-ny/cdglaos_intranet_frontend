<template>
  <div>
    <a @click="mShowText = !mShowText"
      ><div v-if="mShowText">
        {{ mObject.cpn_content | truncate(20, ".....") }}
      </div>
      <div v-else>
        {{ mObject.cpn_content }}
      </div></a
    >
  </div>
</template>
<script>
export default {
  props: {
    mObject: Object,
  },
  data() {
    return {
      mShowText: true,
    };
  },
};
</script>
<style></style>
