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
            ><div class="font20b">{{ $t("title.titleAddcompany") }}</div></span
          >
        </v-card-title>
        <v-divider></v-divider>
        <progressLiner :loading="loading" />
        <div>
          <v-card-text class="mt-2">
            <v-container class="grey lighten-4 font14r">
              <v-form ref="form" lazy-validation>
                <v-row no-gutters>
                  <v-col cols="12" sm="6" md="6" class="pr-2">
                    <v-text-field
                      :label="this.$t('textfield.company_name')"
                      v-model="mData.cpn_name"
                      prepend-inner-icon="mdi-home-city"
                      solo
                      required
                      clearable
                      :rules="[mValid.require]"
                    ></v-text-field>
                    <v-text-field
                      :label="this.$t('textfield.serial_Company')"
                      v-model="mData.cpn_serialNumber"
                      prepend-inner-icon="mdi-script-text-key"
                      solo
                      required
                      clearable
                      :rules="[mValid.require]"
                    ></v-text-field>
                    <fieldphoner @onPhone="onPhoneNumber" />
                    <v-text-field
                      :label="this.$t('textfield.tell')"
                      v-model="mData.cpn_tell"
                      prepend-inner-icon="mdi-phone-classic"
                      solo
                      required
                      clearable
                      :rules="[
                        mValid.require,
                        mValid.tell,
                        mValid.number,
                        mValid.space,
                        mValid.specialCharactor,
                      ]"
                    ></v-text-field>
                    <!--  field date  -->
                    <v-menu
                      ref="mStartMenu"
                      v-model="mStartMenu"
                      :close-on-content-click="false"
                      :return-value.sync="mData.cpn_fromDate"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="mData.cpn_fromDate"
                          outlined
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        >
                          <template slot="prepend-inner">
                            <span><v-icon>mdi-calendar</v-icon></span>
                          </template>
                          <template slot="label">
                            <span>{{ $t("textfield.fromDate") }}</span>
                          </template>
                        </v-text-field>
                      </template>
                      <v-date-picker
                        v-model="mData.cpn_fromDate"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <btnCancel @onCancel="mStartMenu = false" />
                        <btnAccept
                          @onAccept="$refs.mStartMenu.save(mData.cpn_fromDate)"
                        />
                      </v-date-picker>
                    </v-menu>
                    <!-- ens start datetime -->
                    <!-- select Month -->
                    <v-select
                      outlined
                      :items="mSelectMonth"
                      v-model="mValue"
                      :label="$t('txtfield.selectMonth')"
                      :rules="[mValid.require]"
                      prepend-inner-icon="mdi-checkbox-multiple-outline"
                    ></v-select>
                    <!-- end data tiem -->
                    <v-menu
                      disabled
                      ref="mEndMenu"
                      v-model="mEndMenu"
                      :close-on-content-click="false"
                      :return-value.sync="mData.cpn_endDate"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          outlined
                          v-model="mData.cpn_endDate"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        >
                          <template slot="prepend-inner">
                            <span><v-icon>mdi-calendar</v-icon></span>
                          </template>
                          <template slot="label">
                            <span>{{ $t("textfield.endDate") }}</span>
                          </template>
                        </v-text-field>
                      </template>
                      <v-date-picker
                        v-model="mData.cpn_endDate"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <btnCancel @onCancel="mEndMenu = false" />
                        <btnAccept
                          @onAccept="$refs.mEndMenu.save(mData.cpn_endDate)"
                        />
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-textarea
                      solo
                      clearable
                      v-model="mData.cpn_content"
                      rows="20"
                      row-height="60"
                      append-icon="mdi-comment"
                      :label="this.$t('textfield.content')"
                      :rules="[mValid.require]"
                    >
                    </v-textarea>
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
        </div>
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
      mStartMenu: false,
      mEndMenu: false,
      mSelectMonth: [1, 2, 3, 5, 8, 10, 12, 16, 18, 24, 36, 48],
      mValue: 0,
      //validator
      mData: {
        cpn_name: "",
        cpn_serialNumber: "",
        cpn_phone: "",
        cpn_tell: "",
        cpn_content: "",
        cpn_fromDate: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        cpn_endDate: "",
        cpn_state: "active",
      },
    };
  },
  methods: {
    onClose() {
      this.$emit("onClose");
    },
    onPhoneNumber(phone) {
      this.mData.cpn_phone = phone;
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$emit("onSubmit", this.mData);
      }
    },
  },
  computed: {
    mValid() {
      return { ...valid.Rules };
    },
  },
  watch: {
    dialogform() {
      if (this.dialogform == false) {
        this.loading = false;

        this.mData.cpn_name = "";
        this.mData.cpn_serialNumber = "";
        this.mData.cpn_phone = "";
        this.mData.cpn_tell = "";
        this.mData.cpn_content = "";
        this.mData.cpn_fromDate = new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10);
        this.mData.cpn_endDate = "";
        this.mData.cpn_state = "active";
      }
    },
    mValue() {
      var dates = new Date(this.mData.cpn_fromDate);
      var newDate = new Date(
        new Date(dates).setMonth(dates.getMonth() + this.mValue)
      );
      this.mData.cpn_endDate = newDate.toISOString().substr(0, 10);
    },
    mStartMenu() {
      if (this.mStartMenu == false) {
        var dates = new Date(this.mData.cpn_fromDate);
        var newDate = new Date(
          new Date(dates).setMonth(dates.getMonth() + this.mValue)
        );
        this.mData.cpn_endDate = newDate.toISOString().substr(0, 10);
      }
    },
  },
};
</script>
<style></style>
