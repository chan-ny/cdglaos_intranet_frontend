<template>
  <div>
    <v-dialog v-model="dialog" persistent width="460">
      <v-card>
        <v-card-title class="grey lighten-2">
          <span class="headline"
            ><div class="font20b">{{ $t("title.titleEditcompany") }}</div></span
          >
        </v-card-title>
        <v-card-text class="mt-4 font14r">
          <v-form>
            <v-text-field
              :label="this.$t('textfield.company.fromDate')"
              v-model="mStartDate"
              prepend-inner-icon="mdi-calendar-range"
              solo
              required
            ></v-text-field>
            <v-text-field
              :label="this.$t('textfield.company.endDate')"
              v-model="mEndDate"
              prepend-inner-icon="mdi-clipboard-text-clock"
              solo
              required
            ></v-text-field>
            <!-- select Month -->
            <v-select
              outlined
              :items="mSelectMonth"
              v-model="mValue"
              :label="$t('txtfield.selectMonth')"
              prepend-inner-icon="mdi-checkbox-multiple-outline"
            ></v-select>
            <!-- end data tiem -->
          </v-form>
        </v-card-text>
        <v-card-actions class="mt-n4">
          <v-spacer></v-spacer>
          <div class="mr-2">
            <btnCancel @onCancel="onClose" />
          </div>
          <div>
            <btnEdit @onEdit="onEdit" />
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialog: Boolean,
  },
  data() {
    return {
      mEndDate: "",
      mStartDate: "",
      mSelectMonth: [1, 2, 3, 5, 8, 10, 12, 16, 18, 24, 36, 48],
      mValue: 0,
    };
  },
  methods: {
    onClose() {
      this.$emit("onClose");
    },
    onEdit() {},
  },
};
</script>
<style></style>
