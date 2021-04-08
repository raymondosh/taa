<template>
  <div>
    <div class="lightbox">
      <div class="flex">
        <div class="info">
          <div class="">
            <button class="close-btn" @click.stop="hide">Close</button>
          </div>
          <p>Trip Photos</p>
        </div>

        <div class="lightbox-image" @click.stop="">
          <img
            @click="selectImg(index)"
            v-for="(img, index) in images"
            :key="index"
            :src="img"
          />
        </div>
      </div>
    </div>
  </div>
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
  background: #fff;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;

  padding-top: 5rem;
}

.lightbox-image {
  display: grid;
  grid-template-columns: repeat(3, 300px);
  justify-content: center;
  align-content: center;
  grid-gap: 10px;
  height: 100vh;

  background: #263542;
}

.lightbox-image img {
  width: 100%;
  height: 200px;
  cursor: pointer;
}

.info {
  display: grid;
  grid-template-columns: repeat(3, 300px);
  justify-content: center;
  align-content: center;
  grid-gap: 10px;

  margin-bottom: 1.6rem;
  color: #181818;
}

.close-btn {
  display: block;
  padding: 0.6rem 1.6rem;
  background: none;
  color: #263542;
  border-radius: 0.4rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .lightbox-image {
    display: block;
  }
}
</style>
