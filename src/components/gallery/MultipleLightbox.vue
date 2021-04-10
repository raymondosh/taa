<template>
  <!-- <div> -->
  <div class="lightbox">
    <div class="info">
      <div class="container">
        <div class="info-box">
          <div class="">
            <button class="close-btn" @click.stop="hide">Close</button>
          </div>
          <p>Trip Photos</p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="lightbox-image" @click.stop="">
        <div
          class="lightbox-image-wrap"
          @click="selectImg(index)"
          v-for="(img, index) in images"
          :key="index"
        >
          <img :src="img" />
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      img: "",
    };
  },
  methods: {
    show() {
      this.$emit("show");
    },
    hide() {
      this.$emit("close");
    },
    selectImg(index) {
      this.$emit("select-image", index);
    },
  },
};
</script>

<style scoped>
.lightbox {
  background: #263542;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.container {
  max-width: 1440px;
  margin: auto;
}

.lightbox-image {
  display: grid;
  background: #263542;
  grid-template-columns: repeat(auto-fill, minmax(428px, 1fr));
  justify-content: center;
  align-content: center;
  grid-gap: 2rem;
  padding: 2rem 5.8rem 5.5rem;
  overflow: auto;
}

.lightbox-image .lightbox-image-wrap {
  width: 100%;
  height: 241px;
  margin: auto;
  cursor: pointer;
  overflow: hidden;
}
.lightbox-image img {
  width: 100%;
  height: 100%;
  cursor: pointer;
  object-fit: cover;
}

.info {
  margin-bottom: 0;
  color: #181818;
  background: white;
}

.info-box {
  display: flex;
  align-items: center;
  padding: 1.6rem 5.8rem;
}

.info-box > p {
  margin: auto;
}

.close-btn {
  display: block;
  padding: 0.6rem 1.6rem;
  background: none;
  color: #263542;
  border-radius: 0.4rem;
  cursor: pointer;
}
</style>
