<template>
  <div>
    <v-card elevation="4" class="ma-2">
      <div class="pa-4 font20b">{{ $t("manager.Province") }}</div>
      <div class="text-right pr-4 mt-n12">
        <btnAdd @onAdd="aDialog = !aDialog" />
      </div>
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
        :items-per-page="15"
      >
        <template v-slot:[`item.countDistrict`]="{ item }">
          <v-chip color="primary" small>{{ item.countDistrict }}</v-chip>
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          <formatDate :mDate="item.createdAt" />
        </template>
        <template v-slot:[`item.updatedAt`]="{ item }">
          <formatDate :mDate="item.updatedAt" />
        </template>
        <template v-slot:[`item.pv_status`]="{ item }">
          <v-chip dark color="green" small>{{ item.pv_status }}</v-chip>
        </template>
        <template v-slot:[`item.active`]="{ item }">
          <div class="d-flex">
            <btnupdate @onUpdate="onUpdate(item)" />
            <btndelete
              v-if="item.countDistrict == 0"
              @onDelete="onDelete(item)"
            />
            <btnview v-if="item.countDistrict != 0" @onView="onView(item)" />
          </div>
        </template>
      </v-data-table>
    </v-card>
    <!-- form add -->
    <formAdd
      :dialogform="aDialog"
      @onClose="aDialog = !aDialog"
      @onSubmit="provinceCreate"
    />
    <!-- form update -->
    <formUpdate
      :dialogform="eDialog"
      :mValue="eValue"
      @onClose="eDialog = !eDialog"
      @onEdit="provinceEit"
    />
    <!-- form View -->
    <formView :dialogform="vDialog" :mValue="vValue" @onClose="vDialog = !vDialog" />
    <!-- //loader -->
    <loader :overlay="mLoader" />
  </div>
</template>
<script>
import ProvinceService from "../../service/ProvinceService";
import FormAdd from "./provinceCreate.vue";
import FormUpdate from "./provinceUpdate.vue";
import FormView from "./provinceView.vue";
import MSG from "../../components/notification/messageRight";
export default {
  components: {
    formAdd: FormAdd,
    formUpdate: FormUpdate,
    formView: FormView,
  },
  data() {
    return {
      mItem: [],
      mCount: 0,
      load: false,

      //form area
      aDialog: false,
      mLoader: false,
      eDialog: false,
      eValue: null,
      vDialog: false,
      vValue: null,
    };
  },
  created() {
    this.initially();
  },
  methods: {
    async initially() {
      this.load = true;
      await ProvinceService.dispaly()
        .then((result) => {
          this.mCount = result.data.consts;
          const array = result.data.rs;
          this.mItem = array.map((data, index) => ({
            ...data,
            countDistrict: data.Districts.length,
            No: index + 1,
          }));
          // console.log(result.data.rs);
        })
        .catch(() => {
          this.mItem = [];
          console.clear();
        });
      this.load = false;
    },
    //create province
    async provinceCreate(item) {
      await ProvinceService.create(item)
        .then((result) => {
          this.initially();
          MSG.showMessage("success", result.data, 3000);
        })
        .catch(() => {
          this.initially();
          console.clear();
        });
      this.aDialog = false;
    },
    //dialog form update
    async onUpdate(item) {
      this.eValue = item;
      this.eDialog = true;
      //   console.log(item);
    },
    async provinceEit(item) {
      this.eDialog = false;
      await ProvinceService.update(item)
        .then((result) => {
          this.initially();
          MSG.showMessage("success", result.data, 3000);
        })
        .catch((error) => {
          let err = { ...error.response.data };
          MSG.showMessage("error", err, 3000);
        });
    },
    //delete rpovice
    async onDelete(item) {
      this.mLoader = true;
      await MSG.Question(
        this.$t("Alert.question"),
        this.$t("Alert.cotentDelete"),
        this.$t("Alert.yes")
      ).then((result) => {
        if (result) {
          ProvinceService.delete(item.pv_Id)
            .then((result) => {
              this.initially();
              MSG.showMessage("success", result.data, 3000);
            })
            .catch((error) => {
              let err = { ...error.response.data };
              MSG.showMessage("error", err, 3000);
            });
        }
        this.mLoader = false;
      });
    },

    //View
    onView(item) {
      this.vDialog = true;
      this.vValue = item
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
        { text: this.$t("table.pv_english"), value: "pv_engName" },
        {
          text: this.$t("table.pv_lao"),
          value: "pv_laoName",
        },
        { text: this.$t("table.district_Number"), value: "countDistrict" },
        { text: this.$t("table.status"), value: "pv_status" },
        { text: this.$t("table.createdAt"), value: "createdAt" },
        { text: this.$t("table.updatedAt"), value: "updatedAt" },
        { text: this.$t("table.active"), sortable: false, value: "active" },
      ];
    },
  },
};
</script>
<style></style>
