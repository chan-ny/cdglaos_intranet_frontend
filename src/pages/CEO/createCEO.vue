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
          <span class="headline"><div class="font20b">title</div></span>
        </v-card-title>
        <v-divider></v-divider>
        <progressLiner :loading="loading" />
        <v-card-text class="mt-2">
          <v-container class="grey lighten-4 font14r">
            <v-form ref="form" lazy-validation>
              <v-row no-gutters>
                <v-col cols="12" sm="6" md="6" class="pr-2">
                  <v-text-field
                    label="name"
                    prepend-inner-icon="mdi-home"
                    solo
                    clearable
                    :rules="[mValid.require]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="pr-2"> col 2 </v-col>
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
export default {
  props: {
    dialogform: Boolean,
  },
  data() {
    return {
      loading: false,
    };
  },
  //function
  methods: {
    onClose() {
      this.$emit("onClose");
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$emit("onSubmit");
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
      }
    },
  },
};
</script>
<style></style>
