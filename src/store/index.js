import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    role: null,
  },
  mutations: {
    login() {},
  },
  actions: {
    login({ commit }, formValues) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `http://127.0.0.1:5000/login`);
      xhr.responseType = "json";

      xhr.send(JSON.stringify(formValues));

      xhr.onload = function() {
        commit("login", xhr.response.sessionData);
      };

      xhr.onerror = function() {
        alert("Request failed");
      };
    },
  },
  getters: {},
});
