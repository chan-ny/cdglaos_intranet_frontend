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
              {{ $t("title.titleGenderAdd") }}
            </div></span
          >
        </v-card-title>
        <progressLiner :loading="loading" />
        <v-card-text class="mt-4">
          <v-container class="grey lighten-4 font14r">
            <v-form ref="form" lazy-validation>
              <v-row no-gutters>
                <v-col cols="12" class="pr-2">
                  <v-text-field
                    v-model="mData.gd_engname"
                    :label="this.$t('textfield.gender_en')"
                    prepend-inner-icon="mdi-gender-male-female-variant"
                    solo
                    clearable
                    :rules="[mValid.require, mValid.english]"
                  ></v-text-field>
                  <v-text-field
                    v-model="mData.gd_laoname"
                    :label="this.$t('textfield.gender_la')"
                    class="mb-n4"
                    prepend-inner-icon="mdi-gender-male-female-variant"
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
      mData: {
        gd_Id: 0,
        gd_laoname: "",
        gd_engname: "",
        gd_status: "active",
      },
      loading: false,
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
      if (this.mValue != undefined) {
        this.mData.gd_Id = this.mValue.gd_Id;
        this.mData.gd_laoname = this.mValue.gd_laoname;
        this.mData.gd_engname = this.mValue.gd_engname;
        // console.log(this.mValue);
      }
    },
    dialogform() {
      if (this.dialogform == false) {
        this.loading = false;
        this.mData.gd_laoname = null;
        this.mData.gd_engname = null;
      }
    },
  },
  computed: {
    mValid() {
      return { ...valid.Rules };
    },
  },
};
</script>
<style></style>
