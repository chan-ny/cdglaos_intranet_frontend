<template>
  <div>
    <v-dialog
      v-model="dialogform"
      scrollable
      persistent
      :overlay="false"
      max-width="800px"
    >
      <v-card>
        <v-card-title>
          <span class="headline"
            ><div class="font20b">{{ $t("title.titleEditCEO") }}</div></span
          >
        </v-card-title>
        <v-divider></v-divider>
        <progressLiner :loading="loading" />
        <v-card-text class="mt-4">
          <v-container class="grey lighten-4 font14r">
            <v-form ref="form" lazy-validation>
              <v-row no-gutters>
                <v-col cols="12" sm="6" md="6" class="pr-2">
                  <v-text-field
                    v-model="mData.ceo_name"
                    :label="this.$t('textfield.first_Name')"
                    prepend-inner-icon="mdi-home"
                    solo
                    clearable
                    :rules="[mValid.require]"
                  ></v-text-field>
                  <fieldphoner @onPhone="onPhoneNumber" />
                  <v-text-field
                    :label="this.$t('textfield.tell')"
                    v-model="mData.ceo_tell"
                    prepend-inner-icon="mdi-phone-classic"
                    solo
                    clearable
                    :rules="[
                      mValid.require,
                      mValid.number,
                      mValid.space,
                      mValid.specialCharactor,
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="pr-2">
                  <v-text-field
                    :label="this.$t('textfield.email')"
                    v-model="mData.uemail"
                    prepend-inner-icon="mdi-email"
                    solo
                    required
                    clearable
                    :rules="[mValid.require, mValid.space, mValid.email]"
                  ></v-text-field>
                  <v-text-field
                    v-model="mData.upassowrd"
                    :type="mShowpassword ? 'text' : 'password'"
                    name="password"
                    solo
                    :label="this.$t('txtfield.password')"
                    :append-icon="mShowpassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="mShowpassword = !mShowpassword"
                    :counter="8"
                    :rules="[mValid.require, mValid.space]"
                  >
                    <template slot="prepend-inner">
                      <v-icon size="25">mdi-lock</v-icon>
                    </template>
                  </v-text-field>
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
      mShowpassword: false,
      mData: {
        ceo_Id: "",
        ceo_name: "",
        ceo_phone: "",
        ceo_tell: "",
        uemail: "",
        upassowrd: "",
        ustatus: "active",
      },
    };
  },
  //function
  methods: {
    onClose() {
      this.$emit("onClose");
    },
    onPhoneNumber(phone) {
      this.mData.ceo_phone = phone;
    },
    async onEdit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$emit("onEdit", this.mData);
      }
    },
  },
  //computed
  computed: {
    mValid() {
      return { ...valid.Rules };
    },
  },
  //watcher
  watch: {
    dialogform() {
      if (this.dialogform == false) {
        this.loading = false;
        this.mData.ceo_Id = "";
        this.mData.ceo_name = "";
        this.mData.ceo_phone = "";
        this.mData.ceo_tell = "";
        this.mData.uemail = "";
        this.mData.upassowrd = "";
      }
    },
    mValue() {
      this.mData.ceo_Id = this.mValue.ceo_Id;
      this.mData.ceo_name = this.mValue.ceo_name;
      this.mData.ceo_phone = this.mValue.ceo_phone;
      this.mData.ceo_tell = this.mValue.ceo_tell;
      this.mData.uemail = this.mValue.uemail;
    },
  },
};
</script>
<style></style>
