<template>
  <div>
    <v-dialog v-model="dialog" persistent width="460">
      <v-card>
        <v-card-title class="grey lighten-2">
          <span class="headline"
            ><div class="font20b">{{ $t("title.titleEditcompany") }}</div></span
          >
        </v-card-title>
        <v-divider></v-divider>
        <progressLiner :loading="loading" />
        <v-card-text class="mt-6 font14r">
          <v-form ref="form">
            <v-text-field
              outlined
              :label="this.$t('textfield.company.fromDate')"
              v-model="mStartDate"
              prepend-inner-icon="mdi-calendar-range"
              dense
              disabled
            ></v-text-field>
            <v-text-field
              outlined
              :label="this.$t('textfield.company.endDate')"
              v-model="mEndDate"
              prepend-inner-icon="mdi-clipboard-text-clock"
              dense
              disabled
            ></v-text-field>
            <!-- select Month -->
            <v-select
              outlined
              :items="mSelectMonth"
              v-model="mValue"
              :label="$t('txtfield.selectMonth')"
              prepend-inner-icon="mdi-checkbox-multiple-outline"
              :rules="[mValid.require]"
            ></v-select>
            <!-- end data tiem -->
          </v-form>
        </v-card-text>
        <v-card-actions class="mt-n4" v-if="loading == false">
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
import valid from "../../helper/rulesField.js";

export default {
  props: {
    dialog: Boolean,
    mObject: Object,
  },
  data() {
    return {
      loading: false,
      mEndDate: "",
      mStartDate: "",
      mSelectMonth: [1, 2, 3, 5, 8, 10, 12, 16, 18, 24, 36, 48],
      mValue: 0,
      mData: {
        Id: "",
        cpn_endDate: "",
      },
    };
  },
  methods: {
    onClose() {
      this.$emit("onClose");
    },
    onEdit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$emit("onRenew", this.mData);
      }
    },
  },
  computed: {
    mValid() {
      return { ...valid.Rules };
    },
  },
  watch: {
    mObject() {
      this.mStartDate = this.mObject.cpn_fromDate.split("T")[0];
      this.mEndDate = this.mObject.cpn_endDate.split("T")[0];
      this.mData.Id = this.mObject.cpn_Id;
    },
    mValue() {
      var dates = new Date(this.mEndDate);
      var newDate = new Date(
        new Date(dates).setMonth(dates.getMonth() + this.mValue)
      );
      this.mData.cpn_endDate = newDate.toISOString().substr(0, 10);
      this.mEndDate = newDate.toISOString().substr(0, 10);
    },
    dialog() {
      if (this.dialog == false) {
        this.loading = false;
        this.mValue = null;
      }
    },
  },
};
</script>
<style></style>
