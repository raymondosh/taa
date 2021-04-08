/* eslint-disable */

// Import API
import server from "../../api/server";

const defaultState = () => ({
  images: [],
  selectedImage: null,
});

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    images: (state) => state.images,
    selectedImage: (state) => state.selectedImage,
  },
  mutations: {
    SET_IMAGES: (state, data) => {
      state.images = data;
    },
    SET_IMAGE: (state, data) => {
      state.selectedImage = data;
    },
  },
  actions: {
    async getGallery(context) {
      try {
        const token = window.getItem("token");
        const data = await server.call("get", `/api/images?token=${token}`);
        if (data.status === "success") {
          context.commit("SET_IMAGES", data.data.images);
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    async createGallery(context, images) {
      try {
        const token = window.getItem("token");
        const data = await server.call("post", `/api/images?token=${token}`, {
          images,
        });

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
