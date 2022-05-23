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
                  :Id="item.cpn_Id"
                  :mPath="mPath + 'company/' + item.cpn_logo"
                />
              </template>
              <template v-slot:[`item.cpn_state`]="{ item }">
                <swithstate :mObject="item" @onSwith="onSwith" />
              </template>
              <template v-slot:[`item.cpn_content`]="{ item }">
                <textshort :mObject="item" />
              </template>
              <template v-slot:[`item.cpn_fromDate`]="{ item }">
                <formatDate :mDate="item.cpn_fromDate" />
              </template>
              <template v-slot:[`item.cpn_endDate`]="{ item }">
                <datetimeexpried
                  :mExpried="item.ex"
                  :mDate="item.cpn_endDate"
                />
              </template>
              <template v-slot:[`item.createdAt`]="{ item }">
                <formatDate :mDate="item.createdAt" />
              </template>
              <template v-slot:[`item.updatedAt`]="{ item }">
                <formatDate :mDate="item.updatedAt" />
              </template>
              <template v-slot:[`item.active`]="{ item }">
                <speedlial
                  :mCEO="item"
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
          <v-card class="ma-2" elevation="4">
            <FormCEO :mValue="ceoDialog" @onLoadformcompany="initail" />
          </v-card>
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
    <Addceo
      :dialogform="ceoDialog"
      :company_Id="company_Id"
      @onClose="ceoDialog = !ceoDialog"
      @onSubmit="onCreateCEO"
    />

    <!-- area loader -->
    <loader :overlay="mLoader" />
  </div>
</template>
<script>
import AccountService from "../../service/AccountService";
import CEOService from "../../service/CeoService";
import Add from "./companyCreate.vue";
import Edit from "./compnayEdit.vue";
import Renew from "./companyRenew.vue";
import AddCEO from "../CEO/createCEO.vue";
import MSG from "../../components/notification/messageRight";

//from ceo
import formCEO from "../CEO/index.vue";
export default {
  components: {
    Addform: Add,
    Editform: Edit,
    RenewForm: Renew,
    Addceo: AddCEO,
    FormCEO: formCEO,
  },
  data() {
    return {
      mItem: [],
      nPage: 0,
      nCount: 0,
      load: false,
      // area from
      aDialog: false,
      eDialog: false,
      mObject: null,
      rDialog: false,
      ceoDialog: false,
      company_Id: 0,
      mPath: process.env.VUE_APP_PATH,
      mLoader: false,
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
        this.nCount = result.data.counts;
        const array = result.data.rs.data;
        for (let index = 0; index < array.length; index++) {
          array[index].ex = this.checkDate(
            new Date(array[index].cpn_fromDate.split("T")[0]),
            new Date(array[index].cpn_endDate.split("T")[0])
          );
        }
        this.mItem = array.map((data, index) => ({
          ...data,
          No: index + 1,
        }));
        // console.log(array);
      });
      this.load = false;
    },
    checkDate(startDate, endDate) {
      return (
        endDate.getMonth() -
        startDate.getMonth() +
        12 * (endDate.getFullYear() - startDate.getFullYear())
      );
    },
    // insert company data
    async onSaveCompany(item) {
      await AccountService.create(item).then((result) => {
        this.aDialog = false;
        this.initail();
        MSG.showMessage("success", result.data, 3000);
        // console.log(result.data.msg);
      });
    },

    //update company date
    async onUpdateCompany(item) {
      await AccountService.update(item).then((result) => {
        this.eDialog = false;
        this.initail();
        MSG.showMessage("success", result.data, 3000);
      });
    },

    //Renew Company data
    async onRenewCompany(item) {
      await AccountService.renew(item).then((result) => {
        this.rDialog = false;
        this.initail();
        MSG.showMessage("success", result.data, 3000);
      });
    },
    async onChengeImage(item) {
      this.mLoader = true;
      const formdata = new FormData();
      formdata.append("image", item.img);

      // conver type
      const config = {
        hesders: { "content-type": "multipart/form-data" },
      };

      await AccountService.changeIMG(item.Id, formdata, config).then(() => {
        this.initail();
        this.mLoader = false;
      });
    },

    // swith state
    async onSwith(item) {
      let state = "";
      if (item.cpn_state == "active") {
        state = "inactive";
      } else {
        state = "active";
      }
      await AccountService.swithState(item.cpn_Id, { state: state }).then(
        (result) => {
          this.initail();
          MSG.showMessage("success", result.data, 3000);
        }
      );
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
    async onCEO(item) {
      this.company_Id = item.cpn_Id;
      this.ceoDialog = true;
    },
    //create CEO
    async onCreateCEO(item) {
      await CEOService.createCEO(item).then((result) => {
        this.ceoDialog = false;
        this.initail();
        MSG.showMessage("success", result.data, 3000);
      });
    },
    //click Delete
    async onDelete(item) {
      await MSG.Question(
        this.$t("Alert.question"),
        this.$t("Alert.cotentDelete"),
        this.$t("Alert.yes")
      ).then((result) => {
        if (result) {
          AccountService.delete(item.cpn_Id).then((result) => {
            this.initail();
            MSG.showMessage("success", result.data, 3000);
          });
        }
      });
    },
  },
  computed: {
    HeaderColumn() {
      return [
        {
          text: this.$t("table.NO"),
          align: "start",
          sortable: false,
          value: "No",
        },
        { text: this.$t("table.company_name"), value: "cpn_name" },
        {
          text: this.$t("table.logo"),
          value: "cpn_logo",
        },
        {
          text: this.$t("table.serial_Company"),
          value: "cpn_serialNumber",
        },
        { text: this.$t("table.phone_Number"), value: "cpn_phone" },
        { text: this.$t("table.tell"), value: "cpn_tell" },
        { text: this.$t("table.content"), value: "cpn_content" },
        { text: this.$t("table.fromDate"), value: "cpn_fromDate" },
        { text: this.$t("table.endDate"), value: "cpn_endDate" },
        { text: this.$t("table.status"), value: "cpn_state" },
        { text: this.$t("table.createdAt"), value: "createdAt" },
        { text: this.$t("table.updatedAt"), value: "updatedAt" },
        { text: this.$t("table.active"), sortable: false, value: "active" },
      ];
    },
  },
};
</script>
<style></style>
