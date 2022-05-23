import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { RednderComponent } from "./components/index";
import i18n from "./i18n";

// vue phone number
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

Vue.component("vue-phone-number-input", VuePhoneNumberInput);

RednderComponent(Vue);
Vue.config.productionTip = false;

// text short
Vue.filter("truncate", function (text, length, suffix) {
  if (text.length > length) {
    return text.substring(0, length) + suffix;
  } else {
    return text;
  }
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
