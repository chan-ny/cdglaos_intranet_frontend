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
            ><div class="font20b">{{ $t("title.titleCEO") }}</div></span
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
                  <fieldphoner :mClear="dialogform" @onPhone="onPhoneNumber" />
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
            <btnSubmit @onSubmit="onSubmit" />
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import valid from "../../helper/rulesField.js";
import MSG from "../../components/notification/messageRight";
export default {
  props: {
    dialogform: Boolean,
    company_Id: Number,
  },
  data() {
    return {
      loading: false,
      mShowpassword: false,
      mData: {
        ceo_name: "",
        company_Id: 0,
        ceo_phone: "",
        ceo_tell: "",
        role_Id: 2,
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
    async onSubmit() {
      if (this.mData.ceo_phone == "") {
        const msg = {
          msgen: this.$t("validation.phone"),
          msgla: this.$t("validation.phone"),
        };
        MSG.showMessage("error", msg, 3000);
        return;
      }
      if (this.$refs.form.validate()) {
        this.mData.company_Id = await this.company_Id;
        this.loading = true;
        this.$emit("onSubmit", this.mData);
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
        this.mData.ceo_Id = null;
        this.mData.ceo_name = null;
        this.mData.ceo_phone = null;
        this.mData.ceo_tell = null;
        this.mData.uemail = null;
        this.mData.upassowrd = null;
      }
    },
  },
};
</script>
<style></style>
