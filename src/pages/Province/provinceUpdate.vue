<template>
  <div>
    <v-dialog
      v-model="dialogform"
      scrollable
      persistent
      :overlay="false"
      max-width="400px"
    >
      <v-card>
        <v-card-title>
          <span class="headline"
            ><div class="font20b">
              {{ $t("title.titleProvinceEdit") }}
            </div></span
          >
        </v-card-title>
        <v-divider></v-divider>
        <progressLiner :loading="loading" />
        <v-card-text class="mt-4">
          <v-container class="grey lighten-4 font14r">
            <v-form ref="form" lazy-validation>
              <v-row no-gutters>
                <v-col cols="12" class="pr-2">
                  <v-text-field
                    v-model="mData.pv_engName"
                    :label="this.$t('textfield.province_en')"
                    prepend-inner-icon="mdi-city"
                    solo
                    clearable
                    :rules="[mValid.require]"
                  ></v-text-field>
                  <v-text-field
                    v-model="mData.pv_laoName"
                    :label="this.$t('textfield.province_la')"
                    class="mb-n4"
                    prepend-inner-icon="mdi-city"
                    solo
                    clearable
                    :rules="[mValid.require]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions v-if="!loading">
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
    dialogform: Boolean,
    mValue: Object,
  },
  data() {
    return {
      loading: false,
      mData: {
        pv_Id: "",
        pv_engName: "",
        pv_laoName: "",
        pv_status: "active",
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
        this.$emit("onEdit", this.mData);
      }
    },
  },
  watch: {
    mValue() {
      //   console.log(this.mValue);
      this.mData.pv_Id = this.mValue.pv_Id;
      this.mData.pv_engName = this.mValue.pv_engName;
      this.mData.pv_laoName = this.mValue.pv_laoName;
    },
    dialogform() {
      if (this.dialogform == false) {
        this.loading = false;
      }
    },
  },
  //computed
  computed: {
    mValid() {
      return { ...valid.Rules };
    },
  },
};
</script>
<style></style>
