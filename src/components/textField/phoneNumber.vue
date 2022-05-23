<template>
  <div>
    <vue-phone-number-input
      default-country-code="LA"
      v-model="vue_phone"
      size="lg"
      class="mb-6"
      :translations="translations"
      :error="ErrorPhone"
      :no-validator-state="ErrorPhone"
      @update="onUpdate"
      @input="onData"
    />
  </div>
</template>
<script>
export default {
  props: {
    mClear: Boolean,
  },
  data() {
    return {
      translations: {
        countrySelectorLabel: this.$t("textfield.country"),
        phoneNumberLabel: this.$t("textfield.phone"),
        example: "Exemple:",
      },
      vue_phone: "",
      mPhone: "",
      ErrorPhone: false,
    };
  },
  methods: {
    onUpdate(payload) {
      this.mPhone = payload.e164;
    },
    onData(item) {
      if (item.split("").length == 14) {
        this.ErrorPhone = false;
        this.$emit("onPhone", this.mPhone);
      } else {
        this.ErrorPhone = true;
      }
    },
  },
  watch: {
    mClear() {
      if (this.mClear == false) {
        this.vue_phone;
        return;
      }
    },
  },
};
</script>
<style></style>
