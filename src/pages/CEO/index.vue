<template>
  <div>
    <v-card elevation="4">
      <div class="pa-4 font20b">{{ $t("manager.CEO") }}</div>
      <div class="text-right pr-4 mt-n12"></div>
      <div class="font16r pl-4">
        <strong class="blue--text">{{ mCount }}</strong>
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
        <template v-slot:[`item.ceo_image`]="{ item }" left>
          <changeImage
            @onImage="onChengeImage"
            :Id="item.ceo_Id"
            :mPath="mPath + 'ceo/' + item.ceo_image"
          />
        </template>
        <template v-slot:[`item.cpn_name`]="{ item }">
          <span class="blue--text">{{ item.cpn_name }}</span>
        </template>
        <template v-slot:[`item.cpn_serialNumber`]="{ item }">
          <span class="blue--text">{{ item.cpn_serialNumber }}</span>
        </template>
        <template v-slot:[`item.role_name`]="{ item }">
          <span class="purple--text">{{ item.role_name }}</span>
        </template>
        <!-- btn activity -->
        <template v-slot:[`item.active`]="{ item }">
          <div class="d-flex">
            <btnupdate @onUpdate="onUpdate(item)" />
            <btndelete @onDelete="onDelete(item)" />
          </div>
        </template>
      </v-data-table>
      <pagination class="ma-2" :mCounts="mCount" @onPage="onPages" />
    </v-card>
    <!-- update -->
    <formUpdate
      :dialogform="mEDialog"
      :mValue="mEValue"
      @onClose="mEDialog = !mEDialog"
      @onEdit="onEdit"
    />
    <!-- area loader -->
    <loader :overlay="mLoader" />
  </div>
</template>
<script>
import CEOService from "../../service/CeoService";
import MSG from "../../components/notification/messageRight";
import formEditCEO from "./updateCEO.vue";
export default {
  props: {
    mValue: Boolean,
  },
  components: {
    formUpdate: formEditCEO,
  },
  data() {
    return {
      mCount: 0,
      load: false,
      mPath: process.env.VUE_APP_PATH,
      mItem: [],
      mLoader: false,
      //area form
      mEDialog: false,
      mEValue: null,
    };
  },
  created() {
    this.initially();
  },
  methods: {
    async initially() {
      this.load = true;
      await CEOService.display()
        .then((result) => {
          this.mCount = result.data.counts;
          const array = result.data.rs;
          this.mItem = array.map((data, index) => ({
            ...data,
            No: index + 1,
          }));
          // console.log(array);
          this.load = false;
        })
        .catch(() => {
          this.mItem = [];
          this.load = false;
          console.clear();
        });
      // reloading form company
      this.$emit("onLoadformcompany");
    },
    async onChengeImage(item) {
      this.mLoader = true;
      const formdata = new FormData();
      formdata.append("image", item.img);

      // conver type
      const config = {
        hesders: { "content-type": "multipart/form-data" },
      };

      await CEOService.changeImage(item.Id, formdata, config).then(() => {
        this.initially();
        this.mLoader = false;
      });
    },
    // update
    onUpdate(item) {
      this.mEDialog = true;
      this.mEValue = item;
      // console.log(item);
    },
    async onEdit(item) {
      await CEOService.update(item.ceo_Id, item)
        .then((result) => {
          this.mEDialog = false;
          this.initially();
          MSG.showMessage("success", result.data, 3000);
        })
        .catch((error) => {
          let err = { ...error.response.data };
          this.mEDialog = false;
          MSG.showMessage("error", err, 3000);
          this.mDa;
          console.clear();
        });
      this.initially();
    },
    //delete
    async onDelete(item) {
      await MSG.Question(
        this.$t("Alert.question"),
        this.$t("Alert.cotentDelete"),
        this.$t("Alert.yes")
      ).then((result) => {
        if (result) {
          CEOService.remove(item.ceo_Id).then((result) => {
            this.initially();
            MSG.showMessage("success", result.data, 3000);
          });
        }
      });
    },
    // render pagination
    onPages(page) {
      this.nPage = page;
      this.initail();
    },
  },
  watch: {
    mValue() {
      this.initially();
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
        { text: this.$t("table.logo"), value: "ceo_image" },
        {
          text: this.$t("table.firstname"),
          value: "ceo_name",
        },
        {
          text: this.$t("table.company_name"),
          value: "cpn_name",
        },
        { text: this.$t("table.serial_Company"), value: "cpn_serialNumber" },
        { text: this.$t("table.phone_Number"), value: "ceo_phone" },
        { text: this.$t("table.tell"), value: "ceo_tell" },
        { text: this.$t("table.email"), value: "uemail" },
        { text: this.$t("table.role_name"), value: "role_name" },
        { text: this.$t("table.active"), sortable: false, value: "active" },
      ];
    },
  },
};
</script>
<style></style>
