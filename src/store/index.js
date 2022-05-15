import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: null,
    isUserLogin: false,
    menu: null,
    language: "",
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.isUserLogin = true;
      } else {
        state.isUserLogin = false;
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    setMenu(state, menu) {
      state.menu = menu;
    },
    setLanguage(state, language) {
      state.language = language;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    setMenu({ commit }, menu) {
      commit("setMenu", menu);
    },
    setLanguage({ commit }, language) {
      commit("setLanguage", language);
    },
  },
  modules: {},
});
