<template>
  <section>
    <header>
      <div class="logo">
        <img src="../../assets/images/logo.svg" alt="Travel Afrique Logo" />
      </div>
    </header>

    <div class="container">
      <div class="grid">
        <div
          @click.prevent="show(index)"
          class="img"
          v-for="(img, index) in images.slice(0, 1)"
          :key="index"
        >
          <img class="thumbnail-img" :src="img.image" alt="Image" />
        </div>
        <div class="grid-more">
          <div
            @click.prevent="show(index)"
            class="img index"
            v-for="(img, index) in images.slice(1, 3)"
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
      </div>
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
      :image="image"
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
      image: null,
    };
  },
  computed: {
    ...mapGetters("gallery", ["selectedImage", "images"]),
    getImages() {
      return this.images.map((img) => img.image);
    },
    // getImage() {
    //   const image = {
    //     title: this.images[this.index].title,
    //     location: this.images[this.index].location,
    //   };
    //   return image;
    // },
  },
  methods: {
    ...mapActions("gallery", ["getGallery"]),
    show(index) {
      this.visible = true;
      this.$store.commit("gallery/SET_IMAGE", this.images[index]);
      this.getImage(index);
      this.index = index;
    },
    getImage(index) {
      this.image = {
        title: this.images[index].title,
        location: this.images[index].location,
      };
      // return image;
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
  background: #fff;
  overflow: auto;
  color: #fff;
  position: relative;
  height: 100vh;
}

header {
  height: 68px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #515d681a;
}

.logo {
  margin-left: 58px;
  width: 165.54px;
  height: 44px;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.thumbnail-img {
  width: 16rem;
}

.float {
  position: absolute;
  left: 15px;
  background: white;
  bottom: 15px;
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

.container {
  display: flex;
  align-items: center;
  min-height: 100vh;
}
.grid {
  display: grid;
  grid-template-columns: 60% 40%;
  grid-gap: 20px;
  grid-auto-flow: dense;
  width: 652.44px;
  margin: 0 auto;
  position: relative;
  height: auto;
  grid-template-rows: 329px;
}
.grid-more {
  display: grid;
  grid-gap: 20px;
  grid-template-rows: 1fr 1fr;
}

.grid .img {
  overflow: hidden;
  cursor: pointer;
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
