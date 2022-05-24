<template>
  <div>
    <v-card elevation="4" class="ma-2">
      <div class="pa-4 font20b">{{ $t("manager.Gender") }}</div>
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
        <template v-slot:[`item.gd_status`]="{ item }">
          <swithstate
            :mStatus="item.gd_status"
            :mId="item.gd_Id"
            @onSwith="onGenderswith"
          />
        </template>
        <template v-slot:[`item.active`]="{ item }">
          <div class="d-flex">
            <btnupdate @onUpdate="onUpdate(item)" />
            <btndelete @onDelete="onDelete(item)" />
          </div>
        </template>
      </v-data-table>
      <pagination class="ma-2" :mCounts="mCount" @onPage="onPages" />
    </v-card>
    <!-- form add -->
    <formAdd
      :dialogform="aDialog"
      @onClose="aDialog = !aDialog"
      @onSubmit="genderCreate"
    />

    <!-- form edit -->
    <formEdit
      :dialogform="eDialog"
      :mValue="eValue"
      @onClose="eDialog = !eDialog"
      @onEdit="genderUpdate"
    />
    <!-- //loader -->
    <loader :overlay="mLoader" />
  </div>
</template>
<script>
import GenderService from "../../service/GenderService";
import FormAdd from "./genderCreate.vue";
import FormEdit from "./genderUpdate.vue";
import MSG from "../../components/notification/messageRight";

export default {
  components: {
    formAdd: FormAdd,
    formEdit: FormEdit,
  },
  data() {
    return {
      mItem: [],
      mCount: 0,
      load: false,
      mLoader: false,
      nPage: 0,

      // area form
      aDialog: false,
      eDialog: false,
      eValue: null,
    };
  },
  created() {
    this.initially();
  },
  methods: {
    onPages(page) {
      this.nPage = page;
      this.initail();
    },
    async initially() {
      this.load = true;
      await GenderService.display({
        params: {
          page: this.nPage,
          size: 20,
        },
      }).then((result) => {
        this.mCount = result.data.counts;
        this.mItem = result.data.rs.data.map((data, index) => ({
          ...data,
          No: index + 1,
        }));
        // console.log(result.data);
      });
      this.load = false;
    },
    async genderCreate(item) {
      await GenderService.create(item)
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
    onUpdate(item) {
      this.eDialog = true;
      this.eValue = item;
      // console.log(item);
    },
    async genderUpdate(item) {
      await GenderService.update(item.gd_Id, item)
        .then((result) => {
          this.initially();
          MSG.showMessage("success", result.data, 3000);
        })
        .catch((error) => {
          let err = { ...error.response.data };
          MSG.showMessage("error", err, 3000);
          // console.clear();
        });
      this.eDialog = false;
    },
    async onDelete(item) {
      this.mLoader = true;
      await MSG.Question(
        this.$t("Alert.question"),
        this.$t("Alert.cotentDelete"),
        this.$t("Alert.yes")
      ).then((result) => {
        if (result) {
          GenderService.delete(item.gd_Id)
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
    async onGenderswith(item) {
      await GenderService.disable(item.Id, item)
        .then((result) => {
          this.initially();
          MSG.showMessage("success", result.data, 3000);
        })
        .catch((error) => {
          let err = { ...error.response.data };
          MSG.showMessage("error", err, 3000);
          console.clear();
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
        { text: this.$t("table.dt_english"), value: "gd_engname" },
        {
          text: this.$t("table.dt_laos"),
          value: "gd_laoname",
        },
        { text: this.$t("table.status"), value: "gd_status" },
        { text: this.$t("table.active"), sortable: false, value: "active" },
      ];
    },
  },
};
</script>
<style></style>
