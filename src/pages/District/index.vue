<template>
  <div>
    <v-card elevation="4" class="ma-2">
      <div class="pa-4 font20b">{{ $t("manager.District") }}</div>
      <div class="text-right pr-4 mt-n12">
        <btnAdd @onAdd="aDialog = !aDialog" />
      </div>
      <div class="font16r pl-4">
        <strong class="blue--text">{{ mCount }}</strong>
        {{ $t("text.list") }}
      </div>
      <v-data-table
        dense
        :headers="HeaderColumn"
        :items="mItem"
        :loading="load"
        class="elevation-3 mt-4 mx-2 font grey lighten-4"
        :items-per-page="15"
      >
        <template v-slot:[`item.createdAt`]="{ item }">
          <formatDate :mDate="item.createdAt" />
        </template>
        <template v-slot:[`item.updatedAt`]="{ item }">
          <formatDate :mDate="item.updatedAt" />
        </template>
        <template v-slot:[`item.province`]="{ item }">
          <v-chip small color="primary">{{ item.province }}</v-chip>
        </template>
        <template v-slot:[`item.dt_status`]="{ item }">
          <v-chip dark color="green" small>{{ item.dt_status }}</v-chip>
        </template>
        <template v-slot:[`item.active`]="{ item }">
          <div class="d-flex">
            <btnupdate @onUpdate="onUpdate(item)" />
            <btndelete @onDelete="onDelete(item)" />
          </div>
        </template>
      </v-data-table>
    </v-card>
    <!-- form add -->
    <formAdd
      :dialogform="aDialog"
      @onClose="aDialog = !aDialog"
      @onSubmit="districtCreate"
    />
    <!-- form edit -->
    <formEdit
      :dialogform="eDialog"
      :mValue="eValue"
      @onClose="eDialog = !eDialog"
      @onEdit="onDistrictUpdate"
    />
    <!-- //loader -->
    <loader :overlay="mLoader" />
  </div>
</template>
<script>
import DistrictService from "../../service/DistrictService";
import FormAdd from "./DistrictCreate.vue";
import FormEdit from "./districtUpdate.vue";
import i18n from "../../i18n";
import MSG from "../../components/notification/messageRight";

export default {
  components: {
    formAdd: FormAdd,
    formEdit: FormEdit,
  },
  data() {
    return {
      mArray: [],
      mCount: 0,
      load: false,
      mLoader: false,

      // form area
      aDialog: false,
      eDialog: false,
      eValue: null,
    };
  },
  created() {
    this.initially();
  },
  methods: {
    async initially() {
      this.load = true;
      await DistrictService.display().then((result) => {
        this.mCount = result.data.counts;
        this.mArray = result.data.rs;
        // console.log(this.mArray);
      });
      this.load = false;
    },
    async districtCreate(item) {
      await DistrictService.create(item)
        .then((result) => {
          this.initially();
          MSG.showMessage("success", result.data, 3000);
        })
        .catch((error) => {
          let err = { ...error.response.data };
          MSG.showMessage("error", err, 3000);
          console.clear();
        });
      this.aDialog = false;
    },
    // update
    onUpdate(item) {
      this.eDialog = true;
      this.eValue = item;
      // console.log(item);
    },
    async onDistrictUpdate(item) {
      await DistrictService.update(item.dt_Id, item)
        .then((result) => {
          this.initially();
          MSG.showMessage("success", result.data, 3000);
        })
        .catch((error) => {
          let err = { ...error.response.data };
          MSG.showMessage("error", err, 3000);
          console.clear();
        });
      this.eDialog = false;
    },
    // form delete
    async onDelete(item) {
      this.mLoader = true;
      await MSG.Question(
        this.$t("Alert.question"),
        this.$t("Alert.cotentDelete"),
        this.$t("Alert.yes")
      ).then((result) => {
        if (result) {
          DistrictService.delete(item.dt_Id)
            .then((result) => {
              this.initially();
              MSG.showMessage("success", result.data, 3000);
            })
            .catch((error) => {
              let err = { ...error.response.data };
              MSG.showMessage("error", err, 3000);
              console.clear();
            });
        }
        this.mLoader = false;
      });
    },
  },
  computed: {
    mItem() {
      return this.mArray.map((data, index) => ({
        ...data,
        province: i18n.locale == "la" ? data.pv_laoName : data.pv_engName,
        No: index + 1,
      }));
    },
    HeaderColumn() {
      return [
        {
          text: this.$t("table.NO"),
          align: "start",
          sortable: false,
          value: "No",
        },
        { text: this.$t("table.dt_english"), value: "dt_engName" },
        {
          text: this.$t("table.dt_laos"),
          value: "dt_laoName",
        },
        { text: this.$t("table.province"), value: "province" },
        { text: this.$t("table.status"), value: "dt_status" },
        { text: this.$t("table.createdAt"), value: "createdAt" },
        { text: this.$t("table.updatedAt"), value: "updatedAt" },
        { text: this.$t("table.active"), sortable: false, value: "active" },
      ];
    },
  },
};
</script>
<style></style>
