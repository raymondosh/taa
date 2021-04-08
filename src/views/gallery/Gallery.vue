<template>
  <section>
    <div class="logo">
      <img src="../../assets/images/logo.svg" alt="Travel Afrique Logo" />
    </div>

    <h1>Galley Page</h1>

    <div class="grid">
      <div
        @click.prevent="show(index)"
        class="img"
        v-for="(img, index) in images.slice(0, 3)"
        :key="index"
      >
        <img class="thumbnail-img" :src="img.image" alt="Image" />
      </div>
    </div>

    <div class="float">
      <button class="float-btn" @click="showMultiple">
        <img src="../../assets/images/button_icon.svg" alt="image icon" />
        <span>Show all photos </span>s
      </button>
    </div>

    <multiple-lightbox
      @select-image="selectImg"
      :images="getImages"
      :visible="isMultiple"
      @close="closeMultiple"
      v-if="!selectedImage && isMultiple"
    ></multiple-lightbox>

    <light-box
      v-if="selectedImage && visible"
      :index="index"
      :visible="visible"
      @hide="hide"
      @show-multiple-lightbox="showMultiple"
      :thumbnail="selectedImage.image"
      :images="getImages"
      :image="getImage"
    ></light-box>
  </section>
</template>

<script>
import LightBox from "../../components/gallery/LightBox.vue";
import MultipleLightbox from "../../components/gallery/MultipleLightbox.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "gallery",
  components: { LightBox, MultipleLightbox },
  data() {
    return {
      visible: false,
      index: 0,
      isMultiple: false,
    };
  },
  computed: {
    ...mapGetters("gallery", ["selectedImage", "images"]),
    getImages() {
      return this.images.map((img) => img.image);
    },
    getImage() {
      return this.images.map((img) => img);
    },
  },
  methods: {
    ...mapActions("gallery", ["getGallery"]),
    show(index) {
      this.visible = true;
      this.$store.commit("gallery/SET_IMAGE", this.images[index]);
      this.index = index;
    },
    hide() {
      this.visible = false;
      this.index = 0;
      this.$store.commit("gallery/SET_IMAGE", null);
    },
    showMultiple() {
      this.isMultiple = true;
    },
    closeMultiple() {
      this.isMultiple = false;
      this.$store.commit("gallery/SET_IMAGE", null);
    },
    selectImg(index) {
      this.$store.commit("gallery/SET_IMAGE", this.images[index]);
      this.isMultiple = false;
      this.show(index);
    },
  },
  async mounted() {
    await this.getGallery();
  },
};
</script>

<style scoped>
section {
  background: #263542;
  height: 100vh;
  overflow: auto;
  color: #fff;
  position: relative;
}

h1 {
  text-align: center;
}

.logo {
  padding: 1.2rem;
}

.logo img {
  width: 30rem;
}

.thumbnail-img {
  width: 16rem;
}

.float {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
}

.float-btn {
  display: flex;
  align-items: center;
  padding: 0.6rem 1rem;
  margin-right: 0.8rem;
  border: 0;
  background: #fff;
  color: #263542;
  border-radius: 0.4rem;
  cursor: pointer;
}

.float-btn img {
  margin-right: 0.6rem;
}

.grid {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 3rem;
  grid-auto-flow: dense;
  width: 100%;

  height: auto;
  width: 90%;
  margin: 0 auto;
  padding: 4.5rem 0;
}

.grid .img {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* object-fit: cover; */
  cursor: pointer;
}

.grid .img:first-child {
  grid-column-start: span 2;
  grid-row-start: span 2;
}

.grid .img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .grid {
    display: block;
  }
}
</style>
