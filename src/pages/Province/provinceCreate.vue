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
            ><div class="font20b">{{ $t("title.titleProvinceAdd") }}</div></span
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
            <btnSubmit @onSubmit="onSubmit" />
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
  },
  data() {
    return {
      loading: false,
      mData: {
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
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$emit("onSubmit", this.mData);
      }
    },
  },
  watch: {
    dialogform() {
      if (this.dialogform == false) {
        this.loading = false;
        this.mData.pv_engName = null;
        this.mData.pv_laoName = null;
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
