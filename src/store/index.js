import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    role: null,
  },
  getters: {
    getIsAuthenticated: (state) => {
      return state.isAuthenticated;
    },
    isDepartmentHead: (state) => {
      return state.role === "departmentHead";
    },
  },
  mutations: {
    login(state, sessionData) {
      state.isAuthenticated = true;
      state.role = sessionData;
    },
    logout(state) {
      console.log("lgout");
      state.isAuthenticated = false;
      state.role = null;
    },
  },
  actions: {
    login({ commit }, formValues) {
      return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.open("POST", `http://127.0.0.1:5000/login`);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

        xhr.send(JSON.stringify(formValues));

        xhr.onload = function() {
          if (xhr.status == 200) {
            commit("login", xhr.response);
            resolve(xhr.response);
          }
        };

        xhr.onerror = function() {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          });
        };
      });
    },
    logout({ commit }) {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.open("POST", "http://127.0.0.1:5000/logout");
      xhr.responseType = "json";

      xhr.send();

      xhr.onload = function() {
        commit("logout");
      };
    },
  },
});
