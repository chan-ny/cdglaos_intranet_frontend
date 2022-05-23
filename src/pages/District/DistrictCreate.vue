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
              {{ $t("title.titleDistrictAdd") }}
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
                  <v-autocomplete
                    v-model="mSelect"
                    :items="mItem"
                    prepend-inner-icon="mdi-city-variant-outline"
                    clearable
                    solo
                    chips
                    hide-no-data
                    item-text="province"
                    item-value="pv_Id"
                    :label="this.$t('textfield.province_choose')"
                    :rules="[mValid.require]"
                  ></v-autocomplete>
                  <v-text-field
                    v-model="mData.dt_engName"
                    :label="this.$t('textfield.district_en')"
                    prepend-inner-icon="mdi-format-list-bulleted-triangle"
                    solo
                    clearable
                    :rules="[mValid.require, mValid.english]"
                  ></v-text-field>
                  <v-text-field
                    v-model="mData.dt_laoName"
                    :label="this.$t('textfield.district_la')"
                    class="mb-n4"
                    prepend-inner-icon="mdi-format-list-bulleted-triangle"
                    solo
                    clearable
                    :rules="[mValid.require, mValid.laos]"
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
import ProvinceService from "../../service/ProvinceService";
import i18n from "../../i18n";

export default {
  props: {
    dialogform: Boolean,
  },
  data() {
    return {
      loading: false,
      mSelect: "",
      mData: {
        province_Id: 0,
        dt_laoName: "",
        dt_engName: "",
        dt_status: "active",
      },
      mArray: [],
    };
  },
  created() {
    this.initially();
  },
  methods: {
    async initially() {
      await ProvinceService.dispaly()
        .then((result) => {
          this.mCount = result.data.consts;
          this.mArray = result.data.rs;
          // console.log(result.data.rs);
        })
        .catch(() => {
          this.mArray = [];
          console.clear();
        });
    },
    onClose() {
      this.$emit("onClose");
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.mData.province_Id = this.mSelect;
        this.$emit("onSubmit", this.mData);
      }
    },
  },
  watch: {
    dialogform() {
      if (this.dialogform == false) {
        this.initially();
        this.mSelect = 0;
        this.loading = false;
        this.mData.dt_engName = null;
        this.mData.dt_laoName = null;
      }
    },
  },
  //computed
  computed: {
    mItem() {
      return this.mArray.map((data, index) => ({
        ...data,
        province: i18n.locale == "la" ? data.pv_laoName : data.pv_engName,
        No: index + 1,
      }));
    },
    mValid() {
      return { ...valid.Rules };
    },
  },
};
</script>
<style></style>
