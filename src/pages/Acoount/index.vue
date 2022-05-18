<template>
  <div>
    <v-card class="ma-2" elevation="4">
      <!-- tabs menu -->
      <v-tabs color="primary" elevation-1 right>
        <v-tab class="cap font16r">{{ $t("title.company") }}</v-tab>
        <v-tab class="cap font16r">{{ $t("title.CEO") }}</v-tab>
        <v-tab-item>
          <!-- card conten one  -->
          <v-card elevation="4">
            <div class="pa-4 font20b">{{ $t("title.titleCompany") }}</div>
            <div class="text-right pr-4 mt-n12">
              <btnAdd @onAdd="aDialog = !aDialog" />
            </div>
            <div class="font16r pl-4">
              <strong class="blue--text">{{ nCount }}</strong>
              {{ $t("text.list") }}
            </div>

            <!-- data table -->
            <v-data-table
              dense
              :headers="HeaderColumn"
              :items="mItem"
              :loading="load"
              class="elevation-3 mt-4 mx-2 font grey lighten-4"
              :footer-props="{ 'items-per-page-options': [20] }"
              :items-per-page="20"
            >
              <template v-slot:[`item.cpn_logo`]="{ item }" left>
                <changeImage
                  @onImage="onChengeImage"
                  :mPath="mPath + 'company/' + item.cpn_logo"
                />
              </template>
              <template v-slot:[`item.cpn_content`]="{ item }">
                <a @click="mShowText = !mShowText"
                  ><div v-if="mShowText">
                    {{ item.cpn_content | truncate(20, ".....") }}
                  </div>
                  <div v-else>
                    {{ item.cpn_content }}
                  </div></a
                >
              </template>
              <template v-slot:[`item.cpn_fromDate`]="{ item }">
                <formatDate :mDate="item.cpn_fromDate" />
              </template>
              <template v-slot:[`item.cpn_endDate`]="{ item }">
                <formatDate :mDate="item.cpn_endDate" />
              </template>
              <template v-slot:[`item.createdAt`]="{ item }">
                <formatDate :mDate="item.createdAt" />
              </template>
              <template v-slot:[`item.updatedAt`]="{ item }">
                <formatDate :mDate="item.updatedAt" />
              </template>
              <template v-slot:[`item.active`]="{ item }">
                <speedlial
                  @onSync="onRenew(item)"
                  @onEdit="onEdit(item)"
                  @onDelete="onDelete(item)"
                  @onCEO="onCEO(item)"
                />
              </template>
            </v-data-table>
            <pagination class="ma-2" :mCounts="nCount" @onPage="onPages" />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <!-- card conten two  -->
          <v-card class="ma-2" elevation="4"> ol </v-card>
        </v-tab-item>
      </v-tabs>
      <!-- end tabs menu -->
    </v-card>

    <!-- area code Add -->
    <Addform
      :dialogform="aDialog"
      @onClose="aDialog = !aDialog"
      @onSubmit="onSaveCompany"
    />
    <!-- area code Edit -->
    <Editform
      :dialogform="eDialog"
      :mObject="mObject"
      @onClose="eDialog = !eDialog"
      @ononEdit="onUpdateCompany"
    />
    <!-- area code renew -->
    <RenewForm
      :dialog="rDialog"
      @onClose="rDialog = !rDialog"
      :mObject="mObject"
      @onRenew="onRenewCompany"
    />
    <!-- area code ceo   -->
    <Addceo :dialogform="ceoDialog" @onClose="ceoDialog = !ceoDialog" />
  </div>
</template>
<script>
import AccountService from "../../service/AccountService";
import Add from "./companyCreate.vue";
import Edit from "./compnayEdit.vue";
import Renew from "./companyRenew.vue";
import AddCEO from "../CEO/createCEO.vue";
import MSG from "../../components/notification/messageRight";
// const keyIP = process.env.VUE_APP_IP;
export default {
  components: {
    Addform: Add,
    Editform: Edit,
    RenewForm: Renew,
    Addceo: AddCEO,
  },
  data() {
    return {
      mItem: [],
      nPage: 0,
      nCount: 0,
      load: false,
      mShowText: true,
      // area from
      aDialog: false,
      eDialog: false,
      mObject: null,
      rDialog: false,
      ceoDialog: false,
      mPath: process.env.VUE_APP_PATH,
    };
  },
  created() {
    this.initail();
  },
  methods: {
    // initail data load
    async initail() {
      this.load = true;
      await AccountService.display({
        params: {
          page: this.nPage,
          size: 20,
        },
      }).then((result) => {
        this.mItem = result.data.rs.data;
        this.nCount = result.data.counts;

        // console.log(this.mItem);
      });
      this.load = false;
    },

    // insert company data
    async onSaveCompany(item) {
      await AccountService.create(item).then((result) => {
        this.aDialog = false;
        this.initail();
        MSG.showMessage("success", result.data.msg, 3000);
        // console.log(result.data.msg);
      });
    },

    //update company date
    async onUpdateCompany(item) {
      await AccountService.update(item).then((result) => {
        this.eDialog = false;
        this.initail();
        MSG.showMessage("success", result.data.msg, 3000);
      });
    },

    //Renew Company data
    async onRenewCompany(item) {
      await AccountService.renew(item).then((result) => {
        this.rDialog = false;
        this.initail();
        MSG.showMessage("success", result.data.msg, 3000);
      });
    },
    onChengeImage(item) {
      console.log(item);
    },
    // render pagination
    onPages(page) {
      this.nPage = page;
      this.initail();
    },

    // click Renew
    onRenew(item) {
      this.rDialog = true;
      this.mObject = item;
      // console.log("renew" + item);
    },

    //click Edit
    onEdit(item) {
      this.eDialog = true;
      this.mObject = item;
    },

    // click Add CEO
    onCEO(item) {
      this.ceoDialog = true;
      console.log(item);
    },
    //click Delete
    async onDelete(item) {
      await MSG.Question(
        this.$t("Alert.question"),
        this.$t("Alert.cotentDelete"),
        this.$t("Alert.yes")
      ).then((result) => {
        if (result) {
          AccountService.delete(item.cpn_Id).then(() => {
            this.initail();
            MSG.showMessage("success", this.$t("Alert.messageDel"), 3000);
          });
        }
      });
    },
  },
  computed: {
    HeaderColumn() {
      return [
        {
          text: this.$t("table.tbcompany.NO"),
          align: "start",
          sortable: false,
          value: "cpn_Id",
        },
        { text: this.$t("table.tbcompany.company_name"), value: "cpn_name" },
        {
          text: this.$t("table.logo"),
          value: "cpn_logo",
        },
        {
          text: this.$t("table.tbcompany.serialCompany"),
          value: "cpn_serialNumber",
        },
        { text: this.$t("table.tbcompany.phoneNumber"), value: "cpn_phone" },
        { text: this.$t("table.tbcompany.tell"), value: "cpn_tell" },
        { text: this.$t("table.tbcompany.content"), value: "cpn_content" },
        { text: this.$t("table.tbcompany.fromDate"), value: "cpn_fromDate" },
        { text: this.$t("table.tbcompany.endDate"), value: "cpn_endDate" },
        { text: this.$t("table.tbcompany.status"), value: "cpn_state" },
        { text: this.$t("table.tbcompany.createdAt"), value: "createdAt" },
        { text: this.$t("table.tbcompany.updatedAt"), value: "updatedAt" },
        { text: this.$t("table.active"), sortable: false, value: "active" },
      ];
    },
  },
};
</script>
<style></style>
