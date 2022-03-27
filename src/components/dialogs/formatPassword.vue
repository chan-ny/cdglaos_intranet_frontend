<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      :overlay="false"
      max-width="400px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="grey lighten-2 font20b">
          {{ $t("text.titleNotification") }}
        </v-card-title>
        <div class="text-center ma-2 font16r red--text">
          {{ $t("text.msgEamil") }}
        </div>
        <v-card-text class="mt-8">
          <v-form class="font14r">
            <v-text-field
              v-model="mEmail"
              ref="email"
              name="email"
              solo
              :label="this.$t('txtfield.emailandphone')"
              :rules="mRule.email"
              required
            >
              <template slot="prepend-inner">
                <v-icon size="30">mdi-email</v-icon>
              </template>
            </v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <Cancel @onCancel="onClose" />
          <v-btn
            class="font14r"
            color="primary"
            elevation="6"
            @click="onSend"
            >{{ $t("btn.send") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialog: Boolean,
  },
  data() {
    return {
      mEmail: "",

      mRule: {
        email: [
          (value) => !!value || this.$t("validate.require"),
          (value) => /.+@.+\..+/.test(value) || this.$t("validate.email"),
        ],
      },
    };
  },
  methods: {
    onClose() {
      this.mEmail = "";
      this.$emit("onClose");
    },
    onSend() {
      if (this.mEmail == "") {
        this.$refs.email.focus();
      } else {
        console.log(this.mEmail);
      }
    },
  },
};
</script>
<style></style>
