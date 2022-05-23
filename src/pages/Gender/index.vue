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
          <v-chip dark color="green" small>{{ item.gd_status }}</v-chip>
        </template></v-data-table
      >
    </v-card>
  </div>
</template>
<script>
import GenderService from "../../service/GenderService";
export default {
  data() {
    return {
      mItem: [],
      mCount: 0,
      load: false,
    };
  },
  created() {
    this.initially();
  },
  methods: {
    async initially() {
      this.load = true;
      await GenderService.display().then((result) => {
        this.mCount = result.data.counts;
        this.mItem = result.data.rs.map((data, index) => ({
          ...data,
          No: index + 1,
        }));
        // console.log(result);
      });
      this.load = false;
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
