import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: !!localStorage.getItem("role"),
    role: localStorage.getItem("role"),
    username: localStorage.getItem("username"),
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
      state.role = sessionData.role;
      state.username = sessionData.username;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = null;
      state.username = null;
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
            const response = JSON.parse(xhr.response);
            localStorage.setItem("role", response.role); // probably not best aside from xss
            localStorage.setItem("username", response.username);
            console.log(localStorage.getItem("role"));
            console.log(localStorage.getItem("username"));
            commit("login", response);
            resolve();
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
      return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.open("POST", "http://127.0.0.1:5000/logout");
        xhr.responseType = "json";

        xhr.send();

        xhr.onload = function() {
          localStorage.removeItem("role");
          localStorage.removeItem("username");
          commit("logout");
          resolve();
        };

        xhr.onerror = function() {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          });
        };
      });
    },
  },
});
