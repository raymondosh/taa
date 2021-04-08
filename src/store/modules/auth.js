/* eslint-disable */

// Import API
import server from "../../api/server";

const defaultState = () => ({
  token: localStorage.getItem("token"),
});

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    token: (state) => state.token,
    isAuthenticated: (state) => !!state.token,
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data;
    },
  },
  actions: {
    async register(context, { email, password }) {
      try {
        const user = await server.call("post", "/api/register", {
          email,
          password,
        });
        if (user.status === "success") {
          context.commit("SET_TOKEN", user.data.token);
          window.setItem("token", user.data.token, 3600 * 24); // set expiration to 24hrs
        }
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    async login(context, { email, password }) {
      try {
        const user = await server.call("post", "/api/login", {
          email,
          password,
        });
        if (user.status === "success") {
          context.commit("SET_TOKEN", user.data.token);
          window.setItem("token", user.data.token, 3600 * 24); // set expiration to 24hr
        }
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
