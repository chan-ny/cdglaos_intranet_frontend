<template>
  <div>
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-list-item>
          <v-card class="ma-1" elevation="5">
            <v-fade-transition>
              <v-overlay v-if="hover" absolute color="#036358">
                <v-btn icon dark @click="selectImage">
                  <v-icon>mdi-cloud-upload</v-icon>
                </v-btn>
              </v-overlay>
            </v-fade-transition>
            <div>
              <v-img contain max-width="60" :src="mPath" class="ma-1"></v-img>
            </div>
            <input
              style="display: none"
              type="file"
              ref="fileinput"
              accept="image/*"
              @change="priviewImage"
            />
          </v-card>
        </v-list-item>
      </template>
    </v-hover>
  </div>
</template>
<script>
export default {
  props: {
    mPath: String,
    Id: Number,
  },
  data() {
    return {
      image: null,
    };
  },
  methods: {
    selectImage() {
      this.$refs.fileinput.click();
    },
    priviewImage(event) {
      var input = event.target;
      if (input.files) {
        this.image = input.files[0];
        this.$emit("onImage", { img: this.image, Id: this.Id });
      }
    },
  },
};
</script>
<style></style>
