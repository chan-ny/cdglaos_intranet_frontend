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
            ><div class="font20b">
              {{ $t("title.District") }}
            </div></span
          >
          <v-spacer></v-spacer>
          <v-btn icon color="error" @click="onClose">
            <v-icon>mdi-close-box-outline</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container class="grey lighten-4 font14r">
            <!-- data table -->
            <v-data-table
              dense
              :headers="HeaderColumn"
              :items="mData"
              class="elevation-3 mt-4 mx-2 font grey lighten-4"
              :items-per-page="15"
            >
              <template v-slot:[`item.createdAt`]="{ item }">
                <formatDate :mDate="item.createdAt" /> </template
            ></v-data-table>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogform: Boolean,
    mValue: Object,
  },
  data() {
    return {
      mData: [],
    };
  },
  methods: {
    onClose() {
      this.$emit("onClose");
    },
  },
  watch: {
    mValue() {
      if (this.mValue != undefined) {
        this.mData = this.mValue.Districts.map((data, index) => ({
          ...data,
          No: index + 1,
        }));
      }
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
        { text: this.$t("table.dt_english"), value: "dt_engName" },
        {
          text: this.$t("table.dt_laos"),
          value: "dt_laoName",
        },
        { text: this.$t("table.createdAt"), value: "createdAt" },
      ];
    },
  },
};
</script>
<style></style>
